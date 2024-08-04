document.addEventListener('DOMContentLoaded', () => {
    const supplierForm = document.getElementById('supplier-form');
    const suppliersContainer = document.querySelector('.suppliers');
    let suppliers = [];

    supplierForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = event.target['supplier-name'].value;
        const email = event.target['supplier-email'].value;
        const phone = event.target['supplier-phone'].value;

        const supplier = {
            name,
            email,
            phone
        };

        suppliers.push(supplier);
        updateSuppliers();
        supplierForm.reset();
    });

    function updateSuppliers() {
        suppliersContainer.innerHTML = '';
        suppliers.forEach((supplier, index) => {
            const supplierItemElement = document.createElement('div');
            supplierItemElement.classList.add('supplier-item');
            supplierItemElement.innerHTML = `
                <span>${supplier.name} - ${supplier.email} - ${supplier.phone}</span>
                <div class="supplier-actions">
                    <button onclick="removeSupplier(${index})">Remover</button>
                </div>
            `;
            suppliersContainer.appendChild(supplierItemElement);
        });
    }

    window.removeSupplier = (index) => {
        suppliers.splice(index, 1);
        updateSuppliers();
    }
});
