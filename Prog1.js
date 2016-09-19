"use strict";

var gl;
var points;
var program;

window.onload = function init(){
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" );
    }
    // Four Vertices

    //  Configure WebGL

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

    //  Load shaders and initialize attribute buffers

    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    program.vertexPositionAttribute = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(program.vertexPositionAttribute);

    program.vertexColorAttribute = gl.getAttribLocation(program, "aVertexColor");
    gl.enableVertexAttribArray(program.vertexColorAttribute);

    // Load the data into the GPU

    initBuffers();

    render();
    
}
    
    


var triangleVertexPositionBuffer;
var squareVertexPositionBuffer;
var triangleVertexColorBuffer;
var squareVertexColorBuffer;
var circleVertexPositionBuffer;
var circleVertexColorBuffer;

function initBuffers() {


    triangleVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);

    var vertices = [
        -0.5,  -0.35,  0.0,
        -0.70, -0.75,  0.0,
        -0.30, -0.75,  0.0
    ];

    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
    triangleVertexPositionBuffer.itemSize = 3;
    triangleVertexPositionBuffer.numItems = 3;

    triangleVertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexColorBuffer);
    var colors = [
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 1.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);
    triangleVertexColorBuffer.itemSize = 4;
    triangleVertexColorBuffer.numItems = 3;

    //squareVertexPositionBuffer = gl.createBuffer();
    //gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);

    /*
     *squareVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);

    vertices = [
        0.75,  0.75,  0.0,
        0.0,  0.75,  0.0,
        0.75, 0.0,  0.0,
        0.0, 0.0,  0.0
    ];

    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
    squareVertexPositionBuffer.itemSize = 3;
    squareVertexPositionBuffer.numItems = 4;

    squareVertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
    colors = [];
    for (var i=0; i < 4; i++) {
        colors = colors.concat([0.5, 0.5, 1.0, 1.0]);
    }
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);
    squareVertexColorBuffer.itemSize = 4;
    squareVertexColorBuffer.numItems = 4;
     *
     *
     */
    
    var center = (0.0, 0.0, 0.0)
    for (var n=0; n<20; n++) {
        j = .01 * n;
        vertices = [
            center - j, center - j,  0.0,
            center - j, center + j,  0.0,
            center + j, center - j,  0.0,
            center + j, center + j, 0.0
        ];
        
        squareVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
        
        gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
            squareVertexPositionBuffer.itemSize = 3;
            squareVertexPositionBuffer.numItems = 4;

        squareVertexColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
        
        if (n%2===0) {
    
            colors = [0.0, 1.0, 0.0, 1.0,
                      0.0, 1.0, 0.0, 1.0,
                      0.0, 1.0, 0.0, 1.0,
                      0.0, 1.0, 0.0, 1.0,];
            for (var i=0; i < 4; i++) {
                colors = colors.concat([0.5, 0.5, 1.0, 1.0]);
                colors = colors.concat([1.0, 0.0, 1.0, 0.0]);
            }
        gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);
        squareVertexColorBuffer.itemSize = 4;
        squareVertexColorBuffer.numItems = 4;
        }
        else {
            colors = [1.0, 1.0, 1.0, 1.0,
                      1.0, 1.0, 1.0, 1.0,
                      1.0, 1.0, 1.0, 1.0,
                      1.0, 1.0, 1.0, 1.0,];
            for (var i=0; i < 4; i++) {
                colors = colors.concat([0.5, 0.5, 1.0, 1.0]);
                colors = colors.concat([1.0, 0.0, 1.0, 0.0]);
            }
            
        gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);
        squareVertexColorBuffer.itemSize = 4;
        squareVertexColorBuffer.numItems = 4;
        }
    
    
        //gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);
        //squareVertexColorBuffer.itemSize = 4;
        //squareVertexColorBuffer.numItems = 4;
        
        /*
        
     circleVertexPositionBuffer = gl.createBuffer();
     gl.bindBuffer(gl.ARRAY_BUFFER, circleVertexPositionBuffer);
    
     circleVertexColorBuffer = gl.createBuffer();
     gl.bindBuffer(gl.ARRAY_BUFFER, circleVertexColorBuffer);
    
    var xCoord;
    var yCoord;
    var r = 0.25; //radius
    //points[ 0.75, 0.75, 0.0 ];
    //vec3 center = vec3( 0.75, 0.75, 0.0);
    points.push(0.75, 0.75);
    for (var i = 0; i < 360; i++){
        xCoord = 0.75 + r*Math.cos(i/57.29577957795135);
        yCoord = 0.75 + r*Math.sin(i/57.29577957795135);
        points.push(xCoord, yCoord);
    }
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);
    circleVertexColorBuffer.itemSize = 3;
    circleVertexColorBuffer.numItems = 360;
    */
}
        
        

    
    }
    

}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );

    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
    gl.vertexAttribPointer(program.vertexPositionAttribute, triangleVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexColorBuffer);
    gl.vertexAttribPointer(program.vertexColorAttribute, triangleVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, triangleVertexPositionBuffer.numItems);
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
    gl.vertexAttribPointer(program.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
    gl.vertexAttribPointer(program.vertexColorAttribute, squareVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, squareVertexPositionBuffer.numItems);

}
