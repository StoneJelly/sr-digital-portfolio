// ===== SAMPLE DATA =====
const SAMPLE_CUSTOMERS = [
  { id: 1, name: 'John Tan', email: 'john@email.com', phone: '012-345-6789', orders: 12, status: 'Active', joined: '2025-01-15' },
  { id: 2, name: 'Sarah Lim', email: 'sarah@email.com', phone: '013-456-7890', orders: 7, status: 'Active', joined: '2025-02-20' },
  { id: 3, name: 'Ahmad Rahman', email: 'ahmad@email.com', phone: '014-567-8901', orders: 5, status: 'Active', joined: '2025-03-10' },
  { id: 4, name: 'Mei Ling', email: 'meiling@email.com', phone: '016-789-0123', orders: 15, status: 'Active', joined: '2024-11-05' },
  { id: 5, name: 'Raj Kumar', email: 'raj@email.com', phone: '017-890-1234', orders: 3, status: 'Inactive', joined: '2025-04-18' },
  { id: 6, name: 'Nurul Izzah', email: 'nurul@email.com', phone: '018-901-2345', orders: 9, status: 'Active', joined: '2025-01-28' },
  { id: 7, name: 'David Wong', email: 'david@email.com', phone: '019-012-3456', orders: 6, status: 'Active', joined: '2025-05-02' },
  { id: 8, name: 'Fatimah Ali', email: 'fatimah@email.com', phone: '011-234-5678', orders: 4, status: 'Inactive', joined: '2025-06-12' },
];

const SAMPLE_PRODUCTS = [
  { id: 1, name: 'Wireless Mouse', sku: 'WM-001', price: 59, stock: 42, category: 'Electronics', status: 'In Stock' },
  { id: 2, name: 'Mechanical Keyboard', sku: 'MK-002', price: 129, stock: 18, category: 'Electronics', status: 'In Stock' },
  { id: 3, name: 'USB-C Hub', sku: 'UH-003', price: 89, stock: 35, category: 'Accessories', status: 'In Stock' },
  { id: 4, name: 'Monitor Stand', sku: 'MS-004', price: 149, stock: 0, category: 'Furniture', status: 'Out of Stock' },
  { id: 5, name: 'Webcam HD', sku: 'WC-005', price: 199, stock: 23, category: 'Electronics', status: 'In Stock' },
  { id: 6, name: 'Desk Lamp', sku: 'DL-006', price: 45, stock: 56, category: 'Furniture', status: 'In Stock' },
  { id: 7, name: 'Headphones Pro', sku: 'HP-007', price: 249, stock: 12, category: 'Electronics', status: 'In Stock' },
  { id: 8, name: 'Notebook A5', sku: 'NB-008', price: 15, stock: 200, category: 'Stationery', status: 'In Stock' },
];

const SAMPLE_ORDERS = [
  { id: 1023, customer: 'John Tan', items: 3, total: 240, status: 'Completed', date: '2026-09-01' },
  { id: 1022, customer: 'Sarah Lim', items: 1, total: 180, status: 'Completed', date: '2026-08-30' },
  { id: 1021, customer: 'Ahmad Rahman', items: 2, total: 158, status: 'Completed', date: '2026-08-29' },
  { id: 1020, customer: 'Mei Ling', items: 5, total: 425, status: 'Completed', date: '2026-08-28' },
  { id: 1019, customer: 'Raj Kumar', items: 1, total: 59, status: 'Pending', date: '2026-08-27' },
  { id: 1018, customer: 'Nurul Izzah', items: 2, total: 148, status: 'Completed', date: '2026-08-26' },
  { id: 1017, customer: 'David Wong', items: 4, total: 312, status: 'Processing', date: '2026-08-25' },
  { id: 1016, customer: 'Fatimah Ali', items: 1, total: 89, status: 'Completed', date: '2026-08-24' },
  { id: 1015, customer: 'John Tan', items: 2, total: 178, status: 'Completed', date: '2026-08-23' },
  { id: 1014, customer: 'Sarah Lim', items: 3, total: 267, status: 'Cancelled', date: '2026-08-22' },
];

const REVENUE_DATA = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
  data: [18500, 22300, 19800, 25600, 23400, 28900, 26700, 24800],
};

const ORDERS_DATA = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
  data: [45, 52, 48, 61, 55, 68, 62, 58],
};

const CUSTOMERS_DATA = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
  data: [12, 15, 11, 18, 14, 22, 19, 16],
};

const TOP_PRODUCTS = [
  { name: 'Headphones Pro', sold: 89 },
  { name: 'Mechanical Keyboard', sold: 76 },
  { name: 'Webcam HD', sold: 64 },
  { name: 'USB-C Hub', sold: 58 },
  { name: 'Wireless Mouse', sold: 52 },
];

// ===== DATA MANAGER =====
const DB = {
  get(key) {
    const val = localStorage.getItem('bizflow_' + key);
    return val ? JSON.parse(val) : null;
  },
  set(key, val) {
    localStorage.setItem('bizflow_' + key, JSON.stringify(val));
  },
  init() {
    if (!this.get('customers')) this.set('customers', SAMPLE_CUSTOMERS);
    if (!this.get('products')) this.set('products', SAMPLE_PRODUCTS);
    if (!this.get('orders')) this.set('orders', SAMPLE_ORDERS);
  },
  reset() {
    this.set('customers', SAMPLE_CUSTOMERS);
    this.set('products', SAMPLE_PRODUCTS);
    this.set('orders', SAMPLE_ORDERS);
  },
  // CRUD helpers
  getAll(key) { return this.get(key) || []; },
  getById(key, id) { return this.getAll(key).find(i => i.id === id); },
  add(key, item) {
    const items = this.getAll(key);
    item.id = Math.max(0, ...items.map(i => i.id)) + 1;
    items.push(item);
    this.set(key, items);
    return item;
  },
  update(key, id, data) {
    const items = this.getAll(key).map(i => i.id === id ? { ...i, ...data } : i);
    this.set(key, items);
  },
  remove(key, id) {
    this.set(key, this.getAll(key).filter(i => i.id !== id));
  },
};
DB.init();
