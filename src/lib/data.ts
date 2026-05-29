export const SIZES_TOP = ['PP', 'P', 'M', 'G', 'GG'];
export const SIZES_BOTTOM = ['36', '38', '40', '42', '44'];

export const grads = {
  pôrdosol: 'linear-gradient(150deg,#FF9A5B,#FF6F91,#C42C6E)',
  coral:    'linear-gradient(150deg,#FFB877,#FF7A6B)',
  rosé:     'linear-gradient(150deg,#FFC2D1,#FF6F91)',
  tropical: 'linear-gradient(150deg,#FFD36E,#FF7A6B,#D94C8E)',
  oceano:   'linear-gradient(150deg,#7FE0D4,#3BA7C4)',
  folhagem: 'linear-gradient(150deg,#A7E0A0,#3FA56B)',
  areia:    'linear-gradient(150deg,#FFE7D6,#E7B98E)',
  vinho:    'linear-gradient(150deg,#E0779F,#7A1745)',
};

function stockSet(sizes: string[], base: number[]) {
  return sizes.map((s, i) => ({ size: s, stock: base[i] }));
}

export const tops = [
  { id: 'T01', type: 'top', name: 'Top Cortininha', print: 'Pôr do Sol', collection: 'Verão 26', grad: grads.pôrdosol, price: 89.9, sizes: stockSet(SIZES_TOP, [8, 14, 22, 11, 3]) },
  { id: 'T02', type: 'top', name: 'Top Tomara que Caia', print: 'Coral Liso', collection: 'Verão 26', grad: grads.coral, price: 99.9, sizes: stockSet(SIZES_TOP, [5, 9, 0, 7, 4]) },
  { id: 'T03', type: 'top', name: 'Top Triângulo', print: 'Rosé', collection: 'Verão 26', grad: grads.rosé, price: 79.9, sizes: stockSet(SIZES_TOP, [12, 18, 25, 14, 6]) },
  { id: 'T04', type: 'top', name: 'Top Frente Única', print: 'Tropical', collection: 'Tropicália', grad: grads.tropical, price: 109.9, sizes: stockSet(SIZES_TOP, [3, 6, 9, 4, 2]) },
  { id: 'T05', type: 'top', name: 'Top Faixa', print: 'Oceano', collection: 'Tropicália', grad: grads.oceano, price: 84.9, sizes: stockSet(SIZES_TOP, [0, 2, 4, 1, 0]) },
  { id: 'T06', type: 'top', name: 'Top Cropped', print: 'Folhagem', collection: 'Tropicália', grad: grads.folhagem, price: 94.9, sizes: stockSet(SIZES_TOP, [9, 13, 16, 8, 5]) },
];

export const bottoms = [
  { id: 'B01', type: 'bottom', name: 'Calcinha Fio Duplo', print: 'Pôr do Sol', collection: 'Verão 26', grad: grads.pôrdosol, price: 79.9, sizes: stockSet(SIZES_BOTTOM, [6, 12, 18, 9, 4]) },
  { id: 'B02', type: 'bottom', name: 'Calcinha Cintura Alta', print: 'Coral Liso', collection: 'Verão 26', grad: grads.coral, price: 89.9, sizes: stockSet(SIZES_BOTTOM, [4, 8, 11, 0, 3]) },
  { id: 'B03', type: 'bottom', name: 'Calcinha Asa Delta', print: 'Rosé', collection: 'Verão 26', grad: grads.rosé, price: 74.9, sizes: stockSet(SIZES_BOTTOM, [10, 15, 20, 12, 5]) },
  { id: 'B04', type: 'bottom', name: 'Calcinha Hot Pant', print: 'Tropical', collection: 'Tropicália', grad: grads.tropical, price: 99.9, sizes: stockSet(SIZES_BOTTOM, [2, 5, 7, 3, 1]) },
  { id: 'B05', type: 'bottom', name: 'Calcinha Lacinho', print: 'Areia', collection: 'Tropicália', grad: grads.areia, price: 69.9, sizes: stockSet(SIZES_BOTTOM, [7, 11, 14, 6, 2]) },
  { id: 'B06', type: 'bottom', name: 'Calcinha Tiras', print: 'Vinho', collection: 'Tropicália', grad: grads.vinho, price: 84.9, sizes: stockSet(SIZES_BOTTOM, [0, 1, 0, 0, 0]) },
];

export const conjuntos = [
  { id: 'C01', type: 'conjunto', name: 'Conjunto Pôr do Sol', print: 'Pôr do Sol', collection: 'Verão 26', grad: grads.pôrdosol, price: 159.9, topRef: 'T01', bottomRef: 'B01' },
  { id: 'C02', type: 'conjunto', name: 'Conjunto Rosé', print: 'Rosé', collection: 'Verão 26', grad: grads.rosé, price: 144.9, topRef: 'T03', bottomRef: 'B03' },
  { id: 'C03', type: 'conjunto', name: 'Conjunto Tropicália', print: 'Tropical', collection: 'Tropicália', grad: grads.tropical, price: 189.9, topRef: 'T04', bottomRef: 'B04' },
];

export const allPieces = [...tops, ...bottoms, ...conjuntos];
export const byId: Record<string, any> = {};
allPieces.forEach(p => { byId[p.id] = p; });

export function stockOf(p: any) {
  if (!p.sizes) return 0;
  return p.sizes.reduce((a: number, s: any) => a + s.stock, 0);
}

export function totalStock(p: any) {
  if (p.type === 'conjunto') {
    const t = byId[p.topRef], b = byId[p.bottomRef];
    return Math.min(stockOf(t), stockOf(b));
  }
  return stockOf(p);
}

export const money = (v: number) => 'R$ ' + v.toFixed(2).replace('.', ',');

export const TYPE_LABEL: Record<string, string> = {
  conjunto: 'Conjunto',
  top: 'Parte de cima',
  bottom: 'Parte de baixo'
};
