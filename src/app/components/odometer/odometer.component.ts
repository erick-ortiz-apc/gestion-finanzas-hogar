import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-odometer',
  templateUrl: './odometer.component.html',
  styleUrls: ['./odometer.component.css']
})
export class OdometerComponent implements OnInit, OnChanges {
  @Input() endValue: number = 0;
  currentValue: number = 0;
  private animationFrameId: number | null = null;

  constructor() {}

  ngOnInit(): void {
    if (this.endValue !== 0) {
      this.animateValue();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['endValue']) {
      this.animateValue();
    }
  }

  private animateValue(): void {
    const duration = 1000;
    const startValue = this.currentValue;
    const startTime = Date.now();

    const updateValue = () => {
      const timeElapsed = Date.now() - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      this.currentValue = Math.round(startValue + (this.endValue - startValue) * progress);

      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(updateValue);
      }
    };

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    updateValue();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}

