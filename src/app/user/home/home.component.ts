import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(private auth:AuthService,
    private router:Router) { }

  @ViewChild('canvasside', { static: true }) myCanvas!: ElementRef;

  ngOnInit(): void {

    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/space'])
    }

    const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
    const context = canvas.getContext('2d')
    if (context) {
      context.strokeStyle = 'red';
      context.fillStyle = 'blue';
      this.#useGradients(context)
      this.#drawRectangle(context)
      // this.#drawTriangle(context)
      this.#drawArc(context)
      this.#drawCurve(context)
      // this.#drawUsingPath(context)
      // this.#drawLine(context)
      // this.#drawText(context)
    }

    const canvasSide: HTMLCanvasElement = this.mySideCanvas.nativeElement;
    const sideContext = canvasSide.getContext('2d')
    if(sideContext) { }
  }

  #drawRectangle(context: CanvasRenderingContext2D) {
    context.fillRect(0, 0, 300, 100);
    context.clearRect(40, 40, 30, 30);
    context.strokeRect(50, 50, 10, 10);
  }

  #drawTriangle(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.moveTo(150, 70)
    context.lineTo(200, 20)
    context.lineTo(200, 120)
    context.closePath()
    // context.fill()
    context.stroke()
  }

  #drawArc(context: CanvasRenderingContext2D) {
    context.beginPath()
    context.arc(50, 10, 20, (Math.PI / 180) * 0, (Math.PI / 180) * 360)
    context.stroke()
  }

  #drawCurve(context: CanvasRenderingContext2D) {
    context.beginPath()
    context.moveTo(50, 20)
    context.quadraticCurveTo(100, 0, 50, 60)
    context.stroke()
    context.beginPath()
    context.moveTo(250, 0)
    context.bezierCurveTo(170, 0, 200, 70, 300, 60)
    context.stroke()
  }

  #drawUsingPath(context: CanvasRenderingContext2D) {
    context.lineWidth = 20
    context.lineJoin = 'round'
    const rectangle = new Path2D()
    rectangle.rect(10, 20, 30, 20)
    context.stroke(rectangle)
    const circle = new Path2D()
    circle.arc(200, 200, 30, (Math.PI / 180) * 0, (Math.PI / 180) * 360)
    context.fill(circle)
  }

  #drawLine(context: CanvasRenderingContext2D) {
    context.lineWidth = 10
    context.lineCap = 'round'
    // context.setLineDash([4,4])
    // context.lineDashOffset= 0
    context.beginPath()
    context.moveTo(20, 50)
    context.lineTo(40, 20)
    context.stroke();
  }

  #drawText(context: CanvasRenderingContext2D) {
    context.shadowOffsetX = 3
    context.shadowOffsetY = 3
    context.shadowBlur = 2
    context.shadowColor = 'violet'
    context.fillStyle = 'black'
    context.font = '18px Arial'
    context.fillText('Hello', 100, 100)   
  }

  #useGradients(context: CanvasRenderingContext2D) {
    const lineargradient = context.createLinearGradient(20, 20, 500, 100);
    lineargradient.addColorStop(0, '#000000');
    lineargradient.addColorStop(.3, '#120813');
    lineargradient.addColorStop(1, '#C20BD2');
    context.fillStyle = lineargradient;
    
    // const radgrad = context.createRadialGradient(300, 300, 40, 300, 300, 80);
    // radgrad.addColorStop(0, 'black');
    // radgrad.addColorStop(0.9, 'yellow');
    // radgrad.addColorStop(1, 'rgba(1, 159, 98, 0.5)');
    // context.fillStyle = radgrad;
    // const conicGrad = context.createConicGradient((Math.PI / 180) * 0, 150, 20);
    // conicGrad.addColorStop(0, 'purple');
    // conicGrad.addColorStop(1, 'black');
    // context.fillStyle = conicGrad;
  }

  @ViewChild('canvassidedown', { static: true }) mySideCanvas!: ElementRef;


}
