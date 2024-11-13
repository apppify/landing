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
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private pixels: Pixel[];
  private coloredPixels: ColoredPixel[];
  private currentPixel: number;
  private mousePosition: { x: number; y: number };
  private colors: string[];
  private readonly pixelSize = 10; // px

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Could not get canvas context');
    this.ctx = context;

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixels = [];
    this.coloredPixels = [];
    this.currentPixel = 0;
    this.mousePosition = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };
    this.colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF']; // Example colors

    // Bind methods to preserve this context
    this.handleResize = this.handleResize.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);

    this.initialize();
  }

  private initialize(): void {
    this.setupCanvas();
    this.initColoredPixels();
    this.setupEventListeners();
    this.draw();
  }

  private setupCanvas(): void {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.initializePixels();
  }

  private initializePixels(): void {
    this.pixels = [];
    for (let y = 0; y < this.height / this.pixelSize; y++) {
      for (let x = 0; x < this.width / this.pixelSize; x++) {
        this.pixels.push({ x: x * this.pixelSize, y: y * this.pixelSize, w: this.pixelSize - 2, h: this.pixelSize - 2, color: '#222', alpha: 1 });
      }
    }
  }

  private initColoredPixels(): void {
    this.coloredPixels = [];
    for (let i = 0; i < 300; i++) {
      this.coloredPixels.push({
        x: this.width / 2,
        y: this.height / 2,
        alpha: 0,
        color: this.colors[i % 5],
        vx: -1 + Math.random() * 2,
        vy: -1 + Math.random() * 2
      });
    }
  }

  private setupEventListeners(): void {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('touchstart', this.handleTouchMove);
    document.addEventListener('touchmove', this.handleTouchMove);
  }

  private handleResize(): void {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.setupCanvas();
  }

  private handleMouseMove(e: MouseEvent): void {
    this.mousePosition = {
      x: e.pageX,
      y: e.pageY
    };
  }

  private handleTouchMove(e: TouchEvent): void {
    e.preventDefault();
    this.mousePosition = {
      x: e.touches[0].pageX,
      y: e.touches[0].pageY
    };
  }

  private launchPixel(): void {
    const pixel = this.coloredPixels[this.currentPixel];
    pixel.x = this.mousePosition.x;
    pixel.y = this.mousePosition.y;
    pixel.alpha = 1;

    this.currentPixel++;
    if (this.currentPixel > 299) this.currentPixel = 0;
  }

  private drawGrid(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Reset pixel colors
    for (let i = 0; i < this.pixels.length; i++) {
      this.pixels[i].color = '';
    }

    // Update colored pixels
    for (let i = 0; i < this.coloredPixels.length; i++) {
      const coloredPixel = this.coloredPixels[i];
      const pixelIndex = Math.floor(coloredPixel.y / 10) * (Math.floor(this.width / 10) + 1) + Math.floor(coloredPixel.x / 10);

      if (this.pixels[pixelIndex]) {
        this.pixels[pixelIndex].color = coloredPixel.color;
        this.pixels[pixelIndex].alpha = coloredPixel.alpha;
      }

      // Update pixel properties
      if (coloredPixel.alpha > 0) coloredPixel.alpha -= 0.008;
      if (coloredPixel.alpha < 0) coloredPixel.alpha = 0;
      coloredPixel.x += coloredPixel.vx;
      coloredPixel.y += coloredPixel.vy;
    }

    // Draw pixels
    for (const pixel of this.pixels) {
      this.ctx.globalAlpha = 1;
      this.ctx.fillStyle = '#222';
      this.ctx.fillRect(pixel.x, pixel.y, pixel.w, pixel.h);

      this.ctx.globalAlpha = pixel.alpha;
      this.ctx.fillStyle = pixel.color;
      this.ctx.fillRect(pixel.x, pixel.y, pixel.w, pixel.h);
    }
  }

  private draw(): void {
    this.launchPixel();
    this.drawGrid();
    requestAnimationFrame(() => this.draw());
  }

  public destroy(): void {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('touchstart', this.handleTouchMove);
    document.removeEventListener('touchmove', this.handleTouchMove);
  }
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