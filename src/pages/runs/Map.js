import React from "react";

export default function Map() {
    React.useEffect(() => {
        var canvas = document.getElementById("myCanvas");
        var context = canvas.getContext("2d");

        context.scale(0.6, 0.42);
        const centerX = 100;
        const centerY = 50;
        const radius = 10;

        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'green';
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = '#003300';
        context.stroke();

        const drawing = new Image();
        drawing.src = "https://www.freeworldmaps.net/download/maps/contour-world-map.jpg"; 
        drawing.onload = function () {
            context.drawImage(drawing, 0, 0);
        };
    }, []);


    return (
        <div>
     
            <canvas
                id="myCanvas"
                width="655"
                height="200"
                style={{ border: "1px solid #d3d3d3" }}
            >
                Your browser does not support the HTML canvas tag.
            </canvas>
        </div>
    );
}