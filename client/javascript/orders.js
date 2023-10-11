async function createOrderElement(data) {
    const response = await fetch(`http://localhost:3000/books/${data["book_id"]}`);
    const book = await response.json();

    const order = document.createElement('div');
    order.className = 'order';

    const bookTitle = document.createElement('p');
    bookTitle.textContent = book["title"];
    order.appendChild(bookTitle);

    const collectionDate = document.createElement('p');
    const sqlDate = data['collection_date'];
    const date = new Date(sqlDate);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    collectionDate.textContent = formattedDate;
    order.appendChild(collectionDate);

    const orderReference = document.createElement('p');
    orderReference.textContent = data['order_reference'];
    order.appendChild(orderReference);

    return order;
}

async function loadOrders() {
    try {
        const user_id = localStorage.getItem('user_id');
        const response = await fetch(`http://localhost:3000/orders/${user_id}`);
        const orders = await response.json();
        console.log(orders);
        if (response.status == 200) {
            const container = document.getElementById("ordersContainer");

            if (orders.length > 0) {
                // Loop through the orders and create elements for each
                orders.forEach(async (order) => {
                    const elem = await createOrderElement(order);
                    container.appendChild(elem);
                });
            } else {
                console.log('No orders found.');
            }
        } else {
            console.log('Error fetching orders.');
        }
    } catch (error) {
        console.log(error);
    }
}

loadOrders();
