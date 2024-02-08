import { create } from 'html-pdf';

const content = `
<!doctype html>
    <html>
       <head>
            <meta charset="utf-8">
            <title>PDF Result Template</title>
            <style>
                h1 {
                    color: green;
                }
            </style>
        </head>
        <body>
            <h1>Título en el PDF creado con el paquete html-pdf</h1>
            <p>Generando un PDF con un HTML sencillo</p>
        </body>
    </html>
`;

create(content).toFile('./html-pdf.pdf', function(err, res) {
    if (err){
        console.log(err);
    } else {
        console.log(res);
    }
});