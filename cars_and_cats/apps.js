var http = require('http');
var fs = require('fs');

var server = http.createServer(function (request, response){

    console.log('client request URL: ', request.url);

    if(request.url === '/') {
        fs.readFile('views/index.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(contents);
            response.end();
        });
    }
    else if(request.url === '/cars') {
        fs.readFile('views/cars.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(contents);
            response.end();
        });
    }
    else if (request.url === "/cats") {
         fs.readFile('views/cats.html', 'utf8', function (errors, contents){
             response.writeHead(200, {'Content-Type': 'text/html'});
             response.write(contents);
             response.end();
         });
    }

    else if (request.url === "/cars/new") {
        fs.readFile('views/new.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(contents);
            response.end();
        });
   }
   else if(request.url === '/stylesheets/style.css'){
    fs.readFile('./stylesheets/style.css', 'utf8', function(errors, contents){
     response.writeHead(200, {'Content-Type': 'text/css'});
     response.write(contents);
     response.end();
    })
  }

  else if(request.url === '/images/download1.jpg'){
    fs.readFile('./images/download (1).jpg', function(errors, contents){
        response.writeHead(200, {'Content-Type': 'image/jpg'});
        response.write(contents);
        response.end();
    })
  }

  else if(request.url === '/images/download(2).jpg'){
    fs.readFile('./images/download (2).jpg', function(errors, contents){
        response.writeHead(200, {'Content-Type': 'image/jpg'});
        response.write(contents);
        response.end();
    })
  }

  else if(request.url === '/images/download(3).jpg'){
    fs.readFile('./images/download (3).jpg', function(errors, contents){
        response.writeHead(200, {'Content-Type': 'image/jpg'});
        response.write(contents);
        response.end();
    })
  }

  else if(request.url === '/images/images(1).jpg'){
    fs.readFile('./images/images (1).jpg', function(errors, contents){
        response.writeHead(200, {'Content-Type': 'image/jpg'});
        response.write(contents);
        response.end();
    })
  }

  else if(request.url === '/images/images(2).jpg'){
    fs.readFile('./images/images (2).jpg', function(errors, contents){
        response.writeHead(200, {'Content-Type': 'image/jpg'});
        response.write(contents);
        response.end();
    })
  }

  else if(request.url === '/images/images(3).jpg'){
    fs.readFile('./images/images (3).jpg', function(errors, contents){
        response.writeHead(200, {'Content-Type': 'image/jpg'});
        response.write(contents);
        response.end();
    })
  }
    else {
        // response.end('File not found!!!');
        response.writeHead(404);
        response.end('File not found!!!');
    }
});

server.listen(7077);

console.log("Running in localhost at port 7077");

