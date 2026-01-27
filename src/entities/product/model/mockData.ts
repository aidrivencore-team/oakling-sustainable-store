import babyOnesie from '@/assets/products/baby-onesie.jpg';
import kidsCardigan from '@/assets/products/kids-cardigan.jpg';
import babyDress from '@/assets/products/baby-dress.jpg';
import kidsTrousers from '@/assets/products/kids-trousers.jpg';
import babyBlanket from '@/assets/products/baby-blanket.jpg';
import { Product } from '@/shared/types/product';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Cotton Onesie',
    description: 'Super soft organic cotton onesie perfect for everyday comfort',
    price: 24.00,
    images: [babyOnesie],
    category: 'baby',
    sizes: ['0-3m', '3-6m', '6-12m', '12-18m'],
    colors: [
      { name: 'Natural', hex: '#F5F0E6' },
      { name: 'Sage', hex: '#8B9D83' },
    ],
    isNew: true,
    isEco: true,
    material: '100% GOTS Certified Organic Cotton',
    ageRange: '0-18 months',
  },
  {
    id: '2',
    name: 'Cozy Knit Cardigan',
    description: 'Hand-finished knitted cardigan in soft sage green',
    price: 42.00,
    images: [kidsCardigan],
    category: 'kids',
    sizes: ['2-3y', '3-4y', '4-5y', '5-6y'],
    colors: [
      { name: 'Sage', hex: '#8B9D83' },
      { name: 'Oat', hex: '#E8DFD0' },
    ],
    isNew: true,
    isEco: true,
    material: 'Organic Cotton Blend',
    ageRange: '2-6 years',
  },
  {
    id: '3',
    name: 'Embroidered Linen Dress',
    description: 'Delicate embroidered dress in dusty rose with flutter sleeves',
    price: 38.00,
    originalPrice: 48.00,
    images: [babyDress],
    category: 'baby',
    sizes: ['6-12m', '12-18m', '18-24m'],
    colors: [
      { name: 'Dusty Rose', hex: '#D4A5A5' },
      { name: 'Cream', hex: '#FAF8F5' },
    ],
    isSale: true,
    isEco: true,
    material: 'Organic Linen Cotton Blend',
    ageRange: '6-24 months',
  },
  {
    id: '4',
    name: 'Comfort Fit Trousers',
    description: 'Easy-wear trousers with elastic waist for growing little ones',
    price: 28.00,
    images: [kidsTrousers],
    category: 'toddler',
    sizes: ['18-24m', '2-3y', '3-4y'],
    colors: [
      { name: 'Sand', hex: '#E8D9C0' },
      { name: 'Forest', hex: '#3D4F3D' },
    ],
    isEco: true,
    material: '95% Organic Cotton, 5% Elastane',
    ageRange: '18 months - 4 years',
  },
  {
    id: '5',
    name: 'Merino Wool Blanket',
    description: 'Luxuriously soft merino wool blanket for snuggles and naptime',
    price: 65.00,
    images: [babyBlanket],
    category: 'accessories',
    sizes: ['One Size'],
    colors: [
      { name: 'Natural', hex: '#FAF8F5' },
      { name: 'Blush', hex: '#E8D0D0' },
    ],
    isNew: true,
    isEco: true,
    material: '100% Mulesing-Free Merino Wool',
  },
];
