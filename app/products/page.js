import { Suspense } from 'react';
import ProductsClient from './ProductsClient';

export const metadata = {
  title: 'Products — Tools & Tackles | Hardware Store, Secunderabad',
  description:
    'Browse hand tools, power tools, electrical supplies, plumbing fittings, fasteners, safety gear & industrial supplies. Search and filter products from Bosch, Stanley, Makita & more.',
};

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div style={{ padding: '4rem 1rem', textAlign: 'center', color: '#64748b' }}>
        Loading products...
      </div>
    }>
      <ProductsClient />
    </Suspense>
  );
}
