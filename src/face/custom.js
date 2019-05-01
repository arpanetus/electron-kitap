const { ipcRenderer } = require('electron');
function book(name) {
    let book = document.createElement('button');
    book.className = 'list-group-item list-group-item-action bg-light';
    book.innerHTML = name;
    book.onclick=()=>{
        const bookContent = document.getElementById("book-content");
        while (bookContent .firstChild) {
            bookContent.removeChild(bookContent.firstChild);
        }
        // document.createElement('iframe')
        const ebook = ePub(`http://localhost:3030/books/${name}`);
        const rendition = ebook.renderTo('book-content', {width: '80%', height: '80%'});
        const displayed = rendition.display();

        function checkKeycode(event) {
            const LEFT = 37;
            const RIGHT = 39;
            const keyDownEvent = event || window.event,
                keycode = (keyDownEvent.which) ? keyDownEvent.which : keyDownEvent.keyCode;

            if(keycode===LEFT) {
                rendition.prev();
            }
            if(keycode===RIGHT){
                rendition.next();
            }

            return false;
        }

        document.onkeydown = checkKeycode;



    };
    return book;
}

function addBook(){
    const input = document.getElementById('book_link');
    ipcRenderer.send(bookAddChannel, input.value);
}

window.onload = function () {
    ipcRenderer.send(mainFromWebChannel, 'start');
    ipcRenderer.on(mainToWebChannel, (event, arg)=>{

        const books = document.getElementById('books');
        while (books.firstChild) {
            books.removeChild(books.firstChild);
        }
        arg.map(
            (el) => {
                books.append(book(el))
                // $('#books').append(book(el));
            });
    })
};

