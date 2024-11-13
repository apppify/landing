import React from 'react';

// Types for our pixel system
type Pixel = { x: number, y: number, w: number, h: number, color: string, alpha: number };
type ColoredPixel = {
  x: number;
  y: number;
  alpha: number;
  color: string;
  vx: number;
  vy: number;
};

class PixelAnimationSystem {
  private readonly pixelSize = 10; // px
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private pixels: Pixel[];
  private coloredPixels: ColoredPixel[];
  private currentPixel: number;
  private mousePosition: { x: number; y: number };
  private readonly colors: string[];
  private pixelsPerRow: number;
  private animationFrameId: number | null = null;
  private lastFrameTime: number = 0;
  private readonly targetFPS = 60;
  private readonly frameInterval = 1000 / this.targetFPS;
  private isMouseMoving: boolean = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext('2d', { alpha: false }); // Optimize for non-transparent canvas
    if (!context) throw new Error('Could not get canvas context');
    this.ctx = context;

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelsPerRow = Math.floor(this.width / this.pixelSize);

    this.pixels = [];
    this.coloredPixels = [];
    this.currentPixel = 0;
    this.mousePosition = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };
    this.colors = ['#FFFFFF', '#EDEDEDED', '#1F1F1F'];

    this.handleResize = this.handleResize.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.draw = this.draw.bind(this);

    this.initialize();
  }

  private initialize(): void {
    this.setupCanvas();
    this.initColoredPixels();
    this.setupEventListeners();
    this.draw(performance.now());
  }

  private setupCanvas(): void {
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    const scale = window.devicePixelRatio || 1;
    this.canvas.width = this.width * scale;
    this.canvas.height = this.height * scale;

    this.ctx.scale(scale, scale);

    this.initializePixels();
  }

  private initializePixels(): void {
    const totalPixels = Math.ceil(this.height / this.pixelSize) * Math.ceil(this.width / this.pixelSize);
    this.pixels = new Array(totalPixels);

    for (let i = 0; i < totalPixels; i++) {
      const x = (i % this.pixelsPerRow) * this.pixelSize;
      const y = Math.floor(i / this.pixelsPerRow) * this.pixelSize;
      this.pixels[i] = {
        x,
        y,
        w: this.pixelSize - 2,
        h: this.pixelSize - 2,
        color: '#222',
        alpha: 1
      };
    }
  }

  private initColoredPixels(): void {
    const totalColoredPixels = 300;
    this.coloredPixels = new Array(totalColoredPixels);

    const centerX = this.width / 2;
    const centerY = this.height / 2;

    for (let i = 0; i < totalColoredPixels; i++) {
      this.coloredPixels[i] = {
        x: centerX,
        y: centerY,
        alpha: 0,
        color: this.colors[i % this.colors.length],
        vx: -1 + Math.random() * 2,
        vy: -1 + Math.random() * 2
      };
    }
  }

  private setupEventListeners(): void {
    window.addEventListener('resize', this.handleResize, { passive: true });
    window.addEventListener('mousemove', this.handleMouseMove, { passive: true });
    document.addEventListener('touchstart', this.handleTouchMove, { passive: false });
    document.addEventListener('touchmove', this.handleTouchMove, { passive: false });
  }

  private handleResize(): void {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }

    this.resizeTimeout = setTimeout(() => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.pixelsPerRow = Math.floor(this.width / this.pixelSize);
      this.setupCanvas();
    }, 150);
  }

  private handleMouseMove(e: MouseEvent): void {
    this.mousePosition.x = e.pageX;
    this.mousePosition.y = e.pageY;
    this.isMouseMoving = true;
    this.launchPixel();
  }

  private handleTouchMove(e: TouchEvent): void {
    e.preventDefault();
    this.mousePosition.x = e.touches[0].pageX;
    this.mousePosition.y = e.touches[0].pageY;
    this.isMouseMoving = true;
    this.launchPixel();
  }

  private launchPixel(): void {
    const pixel = this.coloredPixels[this.currentPixel];
    pixel.x = this.mousePosition.x;
    pixel.y = this.mousePosition.y;
    pixel.alpha = 1;

    this.currentPixel = (this.currentPixel + 1) % 300;
  }

  private drawGrid(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);

    const pixelUpdates = new Map<number, ColoredPixel>();

    for (const coloredPixel of this.coloredPixels) {
      if (coloredPixel.alpha > 0) {
        coloredPixel.alpha = Math.max(0, coloredPixel.alpha - 0.008);
        coloredPixel.x += coloredPixel.vx;
        coloredPixel.y += coloredPixel.vy;

        const pixelIndex = Math.floor(coloredPixel.y / this.pixelSize) * this.pixelsPerRow +
          Math.floor(coloredPixel.x / this.pixelSize);

        if (this.pixels[pixelIndex]) {
          pixelUpdates.set(pixelIndex, coloredPixel);
        }
      }
    }

    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.textBaseline = 'middle';
    this.ctx.textAlign = 'center';
    this.ctx.font = `bold 22vmin geistSans`;
    this.ctx.fillText('AP3IFY👋', this.width / 2, this.height / 3);

    this.ctx.fillStyle = '#222';
    for (const pixel of this.pixels) {
      this.ctx.globalAlpha = 1;
      this.ctx.fillStyle = '#222';
      this.ctx.fillRect(pixel.x, pixel.y, pixel.w, pixel.h);

      const coloredPixel = pixelUpdates.get(this.pixels.indexOf(pixel));
      if (coloredPixel) {
        this.ctx.globalAlpha = coloredPixel.alpha;
        this.ctx.fillStyle = coloredPixel.color;
        this.ctx.fillRect(pixel.x, pixel.y, pixel.w, pixel.h);
      }
    }
  }

  private draw(timestamp: number): void {
    const elapsed = timestamp - this.lastFrameTime;

    if (elapsed >= this.frameInterval) {
      this.lastFrameTime = timestamp - (elapsed % this.frameInterval);

      if (this.isMouseMoving) {
        this.isMouseMoving = false;
        this.launchPixel();
      }

      this.drawGrid();
    }

    this.animationFrameId = requestAnimationFrame(this.draw);
  }

  public destroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('touchstart', this.handleTouchMove);
    document.removeEventListener('touchmove', this.handleTouchMove);

    this.pixels = [];
    this.coloredPixels = [];
  }

  private resizeTimeout: ReturnType<typeof setTimeout> | null = null;
}

// Usage with React:
export const usePixelAnimation = (canvasRef: React.RefObject<HTMLCanvasElement | null>) => {
  React.useEffect(() => {
    if (!canvasRef.current) return;

    const pixelSystem = new PixelAnimationSystem(canvasRef.current);

    return () => {
      pixelSystem.destroy();
    };
  }, [canvasRef]);
};