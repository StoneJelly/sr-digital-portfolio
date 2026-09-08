// ===== APP STATE =====
let currentPage = 'dashboard';
let editingId = null;

// ===== NAVIGATION =====
function navigateTo(page) {
  currentPage = page;
  editingId = null;
  document.querySelectorAll('.nav-item[data-page]').forEach(el => {
    el.classList.toggle('active', el.dataset.page === page);
  });
  const titles = {
    dashboard: 'Dashboard', customers: 'Customers', products: 'Products',
    orders: 'Orders', reports: 'Reports',
  };
  document.getElementById('pageTitle').textContent = titles[page] || page;
  renderPage();
}

// ===== RENDER =====
function renderPage() {
  const content = document.getElementById('pageContent');
  const renderers = { dashboard: renderDashboard, customers: renderCustomers, products: renderProducts, orders: renderOrders, reports: renderReports };
  if (renderers[currentPage]) renderers[currentPage](content);
}

// ===== DASHBOARD =====
function renderDashboard(container) {
  const customers = DB.getAll('customers');
  const products = DB.getAll('products');
  const orders = DB.getAll('orders');
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const activeOrders = orders.filter(o => o.status !== 'Completed' && o.status !== 'Cancelled').length;
  const activeCustomers = customers.filter(c => c.status === 'Active').length;

  container.innerHTML = `
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon blue"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div>
        <div class="stat-info">
          <span class="stat-value">RM${(totalRevenue / 1000).toFixed(1)}K</span>
          <span class="stat-label">Revenue</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>
        <div class="stat-info">
          <span class="stat-value">${orders.length}</span>
          <span class="stat-label">Total Orders</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon purple"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></div>
        <div class="stat-info">
          <span class="stat-value">${activeCustomers}</span>
          <span class="stat-label">Active Customers</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon orange"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg></div>
        <div class="stat-info">
          <span class="stat-value">${products.length}</span>
          <span class="stat-label">Products</span>
        </div>
      </div>
    </div>

    <div class="chart-row">
      <div class="chart-card">
        <h3>Revenue Overview</h3>
        <canvas id="revenueChart"></canvas>
      </div>
      <div class="chart-card">
        <h3>Orders Trend</h3>
        <canvas id="ordersChart"></canvas>
      </div>
    </div>

    <div class="table-card">
      <div class="table-header">
        <h3>Recent Orders</h3>
      </div>
      <table class="data-table">
        <thead>
          <tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Date</th></tr>
        </thead>
        <tbody>
          ${orders.slice(0, 5).map(o => `
            <tr>
              <td class="mono">#${o.id}</td>
              <td>${o.customer}</td>
              <td>${o.items}</td>
              <td>RM${o.total}</td>
              <td><span class="badge ${o.status.toLowerCase()}">${o.status}</span></td>
              <td class="dim">${o.date}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  // Charts
  new Chart(document.getElementById('revenueChart'), {
    type: 'line',
    data: {
      labels: REVENUE_DATA.labels,
      datasets: [{
        label: 'Revenue (RM)',
        data: REVENUE_DATA.data,
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#6366f1',
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#666', callback: v => 'RM' + (v/1000) + 'K' } },
        x: { grid: { display: false }, ticks: { color: '#666' } },
      },
    },
  });

  new Chart(document.getElementById('ordersChart'), {
    type: 'bar',
    data: {
      labels: ORDERS_DATA.labels,
      datasets: [{
        label: 'Orders',
        data: ORDERS_DATA.data,
        backgroundColor: '#818cf8',
        borderRadius: 6,
        borderSkipped: false,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#666' } },
        x: { grid: { display: false }, ticks: { color: '#666' } },
      },
    },
  });
}

// ===== CUSTOMERS =====
function renderCustomers(container) {
  const customers = DB.getAll('customers');
  container.innerHTML = `
    <div class="page-actions">
      <div class="search-filter">
        <input type="text" placeholder="Search customers..." id="searchCustomers" class="search-input">
        <select id="filterStatus" class="filter-select">
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <button class="btn btn-primary" onclick="showCustomerForm()">+ Add Customer</button>
    </div>
    <div class="table-card" id="customersTable">
      ${renderCustomerTable(customers)}
    </div>
    <div class="modal-overlay" id="customerModal" style="display:none">
      <div class="modal">
        <div class="modal-header">
          <h3 id="customerModalTitle">Add Customer</h3>
          <button class="modal-close" onclick="closeModal('customerModal')">&times;</button>
        </div>
        <form id="customerForm" onsubmit="saveCustomer(event)">
          <input type="hidden" id="customerId">
          <div class="form-grid">
            <div class="form-group"><label>Name</label><input type="text" id="customerName" required></div>
            <div class="form-group"><label>Email</label><input type="email" id="customerEmail" required></div>
            <div class="form-group"><label>Phone</label><input type="text" id="customerPhone" required></div>
            <div class="form-group"><label>Status</label>
              <select id="customerStatus"><option value="Active">Active</option><option value="Inactive">Inactive</option></select>
            </div>
          </div>
          <div class="form-actions">
            <button type="button" class="btn btn-ghost" onclick="closeModal('customerModal')">Cancel</button>
            <button type="submit" class="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  `;
  document.getElementById('searchCustomers').addEventListener('input', filterCustomers);
  document.getElementById('filterStatus').addEventListener('change', filterCustomers);
}

function renderCustomerTable(list) {
  if (!list.length) return '<p class="empty">No customers found.</p>';
  return `<table class="data-table"><thead><tr><th>Customer</th><th>Email</th><th>Phone</th><th>Orders</th><th>Status</th><th>Actions</th></tr></thead><tbody>
    ${list.map(c => `<tr>
      <td><strong>${c.name}</strong></td><td class="dim">${c.email}</td><td>${c.phone}</td><td>${c.orders}</td>
      <td><span class="badge ${c.status.toLowerCase()}">${c.status}</span></td>
      <td class="actions">
        <button class="btn-icon" onclick="viewCustomer(${c.id})" title="View"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
        <button class="btn-icon" onclick="editCustomer(${c.id})" title="Edit"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
        <button class="btn-icon danger" onclick="deleteCustomer(${c.id})" title="Delete"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
      </td>
    </tr>`).join('')}
  </tbody></table>`;
}

function filterCustomers() {
  const search = document.getElementById('searchCustomers').value.toLowerCase();
  const status = document.getElementById('filterStatus').value;
  let list = DB.getAll('customers');
  if (search) list = list.filter(c => c.name.toLowerCase().includes(search) || c.email.toLowerCase().includes(search));
  if (status) list = list.filter(c => c.status === status);
  document.getElementById('customersTable').innerHTML = renderCustomerTable(list);
}

function showCustomerForm(id) {
  editingId = id || null;
  const title = document.getElementById('customerModalTitle');
  if (id) {
    title.textContent = 'Edit Customer';
    const c = DB.getById('customers', id);
    document.getElementById('customerId').value = c.id;
    document.getElementById('customerName').value = c.name;
    document.getElementById('customerEmail').value = c.email;
    document.getElementById('customerPhone').value = c.phone;
    document.getElementById('customerStatus').value = c.status;
  } else {
    title.textContent = 'Add Customer';
    document.getElementById('customerForm').reset();
    document.getElementById('customerId').value = '';
  }
  document.getElementById('customerModal').style.display = 'flex';
}

function viewCustomer(id) { showCustomerForm(id); }
function editCustomer(id) { showCustomerForm(id); }

function saveCustomer(e) {
  e.preventDefault();
  const id = document.getElementById('customerId').value;
  const data = {
    name: document.getElementById('customerName').value,
    email: document.getElementById('customerEmail').value,
    phone: document.getElementById('customerPhone').value,
    status: document.getElementById('customerStatus').value,
    orders: 0, joined: new Date().toISOString().slice(0, 10),
  };
  if (id) DB.update('customers', parseInt(id), data);
  else DB.add('customers', data);
  closeModal('customerModal');
  renderCustomers(document.getElementById('pageContent'));
}

function deleteCustomer(id) {
  if (confirm('Delete this customer?')) {
    DB.remove('customers', id);
    renderCustomers(document.getElementById('pageContent'));
  }
}

// ===== PRODUCTS =====
function renderProducts(container) {
  const products = DB.getAll('products');
  container.innerHTML = `
    <div class="page-actions">
      <div class="search-filter">
        <input type="text" placeholder="Search products..." id="searchProducts" class="search-input">
        <select id="filterCategory" class="filter-select">
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Accessories">Accessories</option>
          <option value="Stationery">Stationery</option>
        </select>
      </div>
      <button class="btn btn-primary" onclick="showProductForm()">+ Add Product</button>
    </div>
    <div class="table-card" id="productsTable">
      ${renderProductTable(products)}
    </div>
    <div class="modal-overlay" id="productModal" style="display:none">
      <div class="modal">
        <div class="modal-header">
          <h3 id="productModalTitle">Add Product</h3>
          <button class="modal-close" onclick="closeModal('productModal')">&times;</button>
        </div>
        <form id="productForm" onsubmit="saveProduct(event)">
          <input type="hidden" id="productId">
          <div class="form-grid">
            <div class="form-group"><label>Name</label><input type="text" id="productName" required></div>
            <div class="form-group"><label>SKU</label><input type="text" id="productSku" required></div>
            <div class="form-group"><label>Price (RM)</label><input type="number" id="productPrice" required></div>
            <div class="form-group"><label>Stock</label><input type="number" id="productStock" required></div>
            <div class="form-group"><label>Category</label><input type="text" id="productCategory" required></div>
          </div>
          <div class="form-actions">
            <button type="button" class="btn btn-ghost" onclick="closeModal('productModal')">Cancel</button>
            <button type="submit" class="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  `;
  document.getElementById('searchProducts').addEventListener('input', filterProducts);
  document.getElementById('filterCategory').addEventListener('change', filterProducts);
}

function renderProductTable(list) {
  if (!list.length) return '<p class="empty">No products found.</p>';
  return `<table class="data-table"><thead><tr><th>Product</th><th>SKU</th><th>Price</th><th>Stock</th><th>Status</th><th>Actions</th></tr></thead><tbody>
    ${list.map(p => `<tr>
      <td><strong>${p.name}</strong><br><span class="dim">${p.category}</span></td>
      <td class="mono">${p.sku}</td>
      <td>RM${p.price}</td>
      <td>${p.stock}</td>
      <td><span class="badge ${p.stock === 0 ? 'outofstock' : 'instock'}">${p.stock === 0 ? 'Out of Stock' : 'In Stock'}</span></td>
      <td class="actions">
        <button class="btn-icon" onclick="editProduct(${p.id})" title="Edit"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
        <button class="btn-icon danger" onclick="deleteProduct(${p.id})" title="Delete"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
      </td>
    </tr>`).join('')}
  </tbody></table>`;
}

function filterProducts() {
  const search = document.getElementById('searchProducts').value.toLowerCase();
  const category = document.getElementById('filterCategory').value;
  let list = DB.getAll('products');
  if (search) list = list.filter(p => p.name.toLowerCase().includes(search) || p.sku.toLowerCase().includes(search));
  if (category) list = list.filter(p => p.category === category);
  document.getElementById('productsTable').innerHTML = renderProductTable(list);
}

function showProductForm(id) {
  editingId = id || null;
  const title = document.getElementById('productModalTitle');
  if (id) {
    title.textContent = 'Edit Product';
    const p = DB.getById('products', id);
    document.getElementById('productId').value = p.id;
    document.getElementById('productName').value = p.name;
    document.getElementById('productSku').value = p.sku;
    document.getElementById('productPrice').value = p.price;
    document.getElementById('productStock').value = p.stock;
    document.getElementById('productCategory').value = p.category;
  } else {
    title.textContent = 'Add Product';
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
  }
  document.getElementById('productModal').style.display = 'flex';
}

function editProduct(id) { showProductForm(id); }

function saveProduct(e) {
  e.preventDefault();
  const id = document.getElementById('productId').value;
  const stock = parseInt(document.getElementById('productStock').value);
  const data = {
    name: document.getElementById('productName').value,
    sku: document.getElementById('productSku').value,
    price: parseFloat(document.getElementById('productPrice').value),
    stock,
    category: document.getElementById('productCategory').value,
    status: stock === 0 ? 'Out of Stock' : 'In Stock',
  };
  if (id) DB.update('products', parseInt(id), data);
  else DB.add('products', data);
  closeModal('productModal');
  renderProducts(document.getElementById('pageContent'));
}

function deleteProduct(id) {
  if (confirm('Delete this product?')) {
    DB.remove('products', id);
    renderProducts(document.getElementById('pageContent'));
  }
}

// ===== ORDERS =====
function renderOrders(container) {
  const orders = DB.getAll('orders');
  container.innerHTML = `
    <div class="page-actions">
      <div class="search-filter">
        <input type="text" placeholder="Search orders..." id="searchOrders" class="search-input">
        <select id="filterOrderStatus" class="filter-select">
          <option value="">All Status</option>
          <option value="Completed">Completed</option>
          <option value="Processing">Processing</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
    </div>
    <div class="table-card" id="ordersTable">
      ${renderOrderTable(orders)}
    </div>
  `;
  document.getElementById('searchOrders').addEventListener('input', filterOrders);
  document.getElementById('filterOrderStatus').addEventListener('change', filterOrders);
}

function renderOrderTable(list) {
  if (!list.length) return '<p class="empty">No orders found.</p>';
  return `<table class="data-table"><thead><tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Date</th></tr></thead><tbody>
    ${list.map(o => `<tr>
      <td class="mono">#${o.id}</td>
      <td><strong>${o.customer}</strong></td>
      <td>${o.items}</td>
      <td>RM${o.total}</td>
      <td><span class="badge ${o.status.toLowerCase()}">${o.status}</span></td>
      <td class="dim">${o.date}</td>
    </tr>`).join('')}
  </tbody></table>`;
}

function filterOrders() {
  const search = document.getElementById('searchOrders').value.toLowerCase();
  const status = document.getElementById('filterOrderStatus').value;
  let list = DB.getAll('orders');
  if (search) list = list.filter(o => o.customer.toLowerCase().includes(search) || String(o.id).includes(search));
  if (status) list = list.filter(o => o.status === status);
  document.getElementById('ordersTable').innerHTML = renderOrderTable(list);
}

// ===== REPORTS =====
function renderReports(container) {
  const orders = DB.getAll('orders');
  const customers = DB.getAll('customers');
  const products = DB.getAll('products');
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);

  container.innerHTML = `
    <div class="stats-grid">
      <div class="stat-card"><div class="stat-icon blue"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div><div class="stat-info"><span class="stat-value">RM${(totalRevenue / 1000).toFixed(1)}K</span><span class="stat-label">Total Revenue</span></div></div>
      <div class="stat-card"><div class="stat-icon green"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div><div class="stat-info"><span class="stat-value">${orders.length}</span><span class="stat-label">Total Orders</span></div></div>
      <div class="stat-card"><div class="stat-icon purple"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></div><div class="stat-info"><span class="stat-value">${customers.length}</span><span class="stat-label">Customers</span></div></div>
      <div class="stat-card"><div class="stat-icon orange"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg></div><div class="stat-info"><span class="stat-value">${products.length}</span><span class="stat-label">Products</span></div></div>
    </div>

    <div class="chart-row">
      <div class="chart-card"><h3>Revenue Trend</h3><canvas id="reportRevenue"></canvas></div>
      <div class="chart-card"><h3>Orders by Month</h3><canvas id="reportOrders"></canvas></div>
    </div>

    <div class="chart-row">
      <div class="chart-card"><h3>Top Selling Products</h3><canvas id="reportProducts"></canvas></div>
      <div class="chart-card"><h3>Customer Growth</h3><canvas id="reportCustomers"></canvas></div>
    </div>
  `;

  // Revenue chart
  new Chart(document.getElementById('reportRevenue'), {
    type: 'line',
    data: { labels: REVENUE_DATA.labels, datasets: [{ label: 'Revenue', data: REVENUE_DATA.data, borderColor: '#6366f1', backgroundColor: 'rgba(99,102,241,0.1)', fill: true, tension: 0.4, pointRadius: 4, pointBackgroundColor: '#6366f1' }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#666', callback: v => 'RM' + (v/1000) + 'K' } }, x: { grid: { display: false }, ticks: { color: '#666' } } } },
  });

  // Orders chart
  new Chart(document.getElementById('reportOrders'), {
    type: 'bar',
    data: { labels: ORDERS_DATA.labels, datasets: [{ label: 'Orders', data: ORDERS_DATA.data, backgroundColor: '#818cf8', borderRadius: 6 }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#666' } }, x: { grid: { display: false }, ticks: { color: '#666' } } } },
  });

  // Top products chart
  new Chart(document.getElementById('reportProducts'), {
    type: 'bar',
    data: {
      labels: TOP_PRODUCTS.map(p => p.name),
      datasets: [{ label: 'Units Sold', data: TOP_PRODUCTS.map(p => p.sold), backgroundColor: ['#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe', '#e0e7ff'], borderRadius: 6 }],
    },
    options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#666' } }, y: { grid: { display: false }, ticks: { color: '#666' } } } },
  });

  // Customer growth chart
  new Chart(document.getElementById('reportCustomers'), {
    type: 'line',
    data: { labels: CUSTOMERS_DATA.labels, datasets: [{ label: 'New Customers', data: CUSTOMERS_DATA.data, borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,0.1)', fill: true, tension: 0.4, pointRadius: 4, pointBackgroundColor: '#22c55e' }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#666' } }, x: { grid: { display: false }, ticks: { color: '#666' } } } },
  });
}

// ===== UTILS =====
function closeModal(id) { document.getElementById(id).style.display = 'none'; }

// ===== INIT =====
document.querySelectorAll('.nav-item[data-page]').forEach(el => {
  el.addEventListener('click', (e) => { e.preventDefault(); navigateTo(el.dataset.page); });
});

document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});

document.getElementById('logoutBtn').addEventListener('click', (e) => {
  localStorage.removeItem('bizflow_user');
});

// Check auth
if (!localStorage.getItem('bizflow_user')) {
  window.location.href = 'login.html';
} else {
  const user = JSON.parse(localStorage.getItem('bizflow_user'));
  const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();
  document.getElementById('userAvatar').textContent = initials;
  document.getElementById('mobileUser').textContent = initials;
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  document.getElementById('pageSubtitle').textContent = `${greeting}, Admin`;
  navigateTo('dashboard');
}
