document.addEventListener('DOMContentLoaded', () => {
    const features = [
        { name: 'Custom Domain', price: 50 },
        { name: 'Web Deployment', price: 100 },
        { name: 'SEO Ranking', price: 75 },
        { name: 'Admin Panel', price: 200 },
        { name: 'Admission Enquiry Form', price: 150 },
        { name: 'Students Panel', price: 125 },
        { name: 'Login Access', price: 50 },
        { name: 'Editable Content', price: 60 },
        { name: 'Live Attendance Panel', price: 80 },
        { name: 'Result Page', price: 90 },
        { name: 'Notice Page', price: 40 },
        { name: 'Maintenance', price: 100 },
        { name: 'Staff Panel', price: 110 },
        { name: 'Gallery', price: 55 },
        { name: 'Glory\'s', price: 65 }
    ];

    const featureContainer = document.querySelector('.features');
    const itemList = document.getElementById('itemList');
    const subtotalField = document.getElementById('subtotal');
    const totalField = document.getElementById('total');
    let subtotal = 0;

    features.forEach(feature => {
        const featureElement = document.createElement('div');
        featureElement.className = 'feature-item';
        featureElement.textContent = `${feature.name} - $${feature.price}`;
        featureElement.addEventListener('click', () => {
            addItem(feature);
        });
        featureContainer.appendChild(featureElement);
    });

    const addItem = (feature) => {
        const itemElement = document.createElement('li');
        itemElement.textContent = `${feature.name}: $${feature.price}`;
        itemList.appendChild(itemElement);

        subtotal += feature.price;
        updateTotal();
    };

    const updateTotal = () => {
        subtotalField.textContent = subtotal;
        totalField.textContent = subtotal;  // Assuming no tax
    };

    // Update preview with form data
    const updatePreview = () => {
        document.getElementById('previewInvoiceNo').textContent = document.getElementById('invoiceNo').value;
        document.getElementById('previewInvoiceDate').textContent = document.getElementById('invoiceDate').value;
        document.getElementById('previewClientName').textContent = document.getElementById('clientName').value;
        document.getElementById('previewMobileNumber').textContent = document.getElementById('mobileNumber').value;
        document.getElementById('previewFirmName').textContent = document.getElementById('firmName').value;
        document.getElementById('previewAddress').textContent = document.getElementById('address').value;
    };

    document.getElementById('invoiceForm').addEventListener('input', updatePreview);

    // Print Functionality
    const printButton = document.getElementById('printButton');
    printButton.addEventListener('click', () => {
        printInvoice();
    });

    const printInvoice = () => {
        const printContents = document.getElementById('invoicePreview').innerHTML;
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    };

    // QR Code Generation and Share Functionality
    const shareButton = document.getElementById('shareButton');
    const qrCodeContainer = document.getElementById('qrCodeContainer');

    shareButton.addEventListener('click', () => {
        const invoiceData = gatherInvoiceData();
        const invoiceHTML = generateInvoiceHTML(invoiceData);

        // Create a Blob object representing the data as a file
        const blob = new Blob([invoiceHTML], { type: 'text/html' });

        // Create an object URL for that file
        const url = URL.createObjectURL(blob);

        // Generate QR code for the URL
        generateQRCode(url);

        // Optionally, you can allow the user to download the HTML file
        downloadInvoiceHTML(blob, invoiceData.invoiceNo);
    });

    const gatherInvoiceData = () => {
        const invoiceNo = document.getElementById('invoiceNo').value;
        const date = document.getElementById('invoiceDate').value;
        const clientName = document.getElementById('clientName').value;
        const mobileNumber = document.getElementById('mobileNumber').value;
        const firmName = document.getElementById('firmName').value;
        const address = document.getElementById('address').value;
        const items = [...document.querySelectorAll('#itemList li')].map(li => li.textContent).join('|');

        return {
            invoiceNo, date, clientName, mobileNumber, firmName, address, items
        };
    };

    const generateInvoiceHTML = (data) => {
        const cssStyles = `
            body {
                font-family: Arial, sans-serif;
            }
            .invoice-preview {
                width: 80%;
                margin: 20px auto;
                border: 1px solid #ddd;
                padding: 20px;
            }
            h2 {
                text-align: center;
            }
            p {
                margin: 5px 0;
            }
            ul {
                list-style-type: none;
                padding: 0;
            }
            ul li {
                margin-bottom: 5px;
            }
        `;

        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Invoice ${data.invoiceNo}</title>
                <style>${cssStyles}</style>
            </head>
            <body>
                <div class="invoice-preview">
                    <h2>Invoice Preview</h2>
                    <p>Invoice No: ${data.invoiceNo}</p>
                    <p>Date: ${data.date}</p>
                    <p><strong>BILLED TO:</strong></p>
                    <p>Name: ${data.clientName}</p>
                    <p>Mobile: ${data.mobileNumber}</p>
                    <p>Firm: ${data.firmName}</p>
                    <p>Address: ${data.address}</p>
                    
                    <h3>Items:</h3>
                    <ul>
                        ${data.items.split('|').map(item => `<li>${item}</li>`).join('')}
                    </ul>
                    <p>Subtotal: $${subtotal}</p>
                    <p>Tax: $0</p>
                    <h3>Total: $${subtotal}</h3>
                </div>
            </body>
            </html>
        `;
    };

    const generateQRCode = (link) => {
        qrCodeContainer.innerHTML = ''; // Clear previous QR code
        new QRCode(qrCodeContainer, {
            text: link,
            width: 128,
            height: 128,
            border: 10
        });
    };

    const downloadInvoiceHTML = (blob, invoiceNo) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `invoice_${invoiceNo}.html`;
        link.click();
    };

    // Functionality to save the invoice preview as a PNG image
    const saveAsPNGButton = document.getElementById('saveAsPNGButton');

    saveAsPNGButton.addEventListener('click', () => {
        saveInvoiceAsPNG();
    });

    const saveInvoiceAsPNG = () => {
        const invoicePreview = document.getElementById('invoicePreview');

        html2canvas(invoicePreview).then(canvas => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL();
            link.download = 'invoice_preview.png';
            link.click();
        });
    };

});

function saveQRCode() {

    var qrCodeElement = document.getElementById("qrCodeContainer").querySelector("canvas");
  
  
  
    // Create a new canvas with white background and padding
  
    var canvas = document.createElement("canvas");
  
    var context = canvas.getContext("2d");
  
    canvas.width = qrCodeElement.width + 26; // 13 pixels padding on each side
  
    canvas.height = qrCodeElement.height + 26;
  
  
  
    // Set white background
  
    context.fillStyle = "#ffffff";
  
    context.fillRect(0, 0, canvas.width, canvas.height);
  
  
  
    // Draw the QR code on the new canvas with padding
  
    context.drawImage(qrCodeElement, 13, 13);
  
  
  
    // Convert the canvas to a PNG image
  
    var image = canvas.toDataURL("image/png");
  
  
  
    // Create a download link and save the QR code image
  
    var link = document.createElement("a");
  
    link.href = image;
  
    link.download = `invoice_${invoiceNo}_qrcode.png`;
  
    link.click();
  
  }