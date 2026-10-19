// Product imagery. Cut-out PNGs come from CIC Online (ciconline.com), saved locally in /public/products.
// Products with no CIC Online image use the closest photo already in the site.
import type { ProductCategory } from './products';

/** blend: the PNG has a light grey backdrop, so multiply it into the card tint. */
export type ProductImage = {src: string;cutout?: boolean;blend?: boolean;position?: string;};

const cut = (name: string, blend = false): ProductImage => ({ src: `/products/${name}.png`, cutout: true, blend });
const photo = (src: string, position?: string): ProductImage => ({ src, position });

export const productArt = {
  privateMotor: cut('private-motor'),
  commercialMotor: cut('commercial-motor'),
  medisure: cut('medisure'),
  seniors: cut('seniors'),
  personalAccident: cut('personal-accident'),
  golfers: cut('golfers'),
  travel: cut('travel'),
  pension: cut('jipange-pension'),
  phone: cut('family-hero'),
  service: cut('customer-services')
};

const photos = {
  students: photo('/19f98733-386d-4c89-bb7e-c68bd62f3cc7.jpg', 'center 25%'),
  livingRoom: photo('/7e45657b-c6f1-479d-bba6-c3b011592377.jpg', 'center 20%'),
  matatu: photo('/c5b67aca-d746-4e14-961c-9a80fac072bb.jpg'),
  smile: photo('/953d4772-30ed-48cf-9516-b192cb47b7e0.jpg', 'center 20%'),
  steps: photo('/cc1fa332-e7e8-46c7-847e-2ead4c6b6142.jpg', 'center 30%'),
  outdoors: photo('/b94fbfcf-01cb-464f-83ac-76f9511ef27c.jpg'),
  streetCar: photo('/b066b3bc-dbb4-40a4-aafc-1d3a8ad94905.jpg', 'center 30%'),
  carLot: photo('/0bcd69ea-59f9-4a30-92ae-6a8ff9493590.jpg'),
  cityArt: photo('/7de16e01-1d17-4357-90ce-738935a39459.jpg'),
  mapArt: photo('/675690cd-417a-4a38-ba38-42237d2a771a.jpg')
};

const byId: Record<string, ProductImage> = {
  'easy-bima': productArt.privateMotor,
  'motor-private': productArt.privateMotor,
  'motor-commercial': productArt.commercialMotor,
  'seniors-mediplan': productArt.seniors,
  'sme-medipack': productArt.medisure,
  'afya-bora': productArt.medisure,
  'corporate-medisure': productArt.medisure,
  coopcare: photos.matatu,
  academia: photos.students,
  'smart-saver': productArt.phone,
  'haba-haba': photos.smile,
  'employee-group-life': photos.steps,
  'group-credit-life': photos.livingRoom,
  'loan-guard': photos.streetCar,
  'board-endowment': photos.livingRoom,
  'money-market-fund': productArt.phone,
  'jipange-plus': productArt.pension,
  'income-draw-down': productArt.pension,
  'umbrella-scheme': photos.matatu,
  'home-insurance': photos.livingRoom,
  'fire-insurance': photos.cityArt,
  'fire-industrial': photos.cityArt,
  'property-insurance': photos.mapArt,
  wiba: productArt.service,
  'professional-indemnity': productArt.travel,
  'personal-accident': productArt.personalAccident,
  'golfers-insurance': productArt.golfers,
  'mjengo-plus': photos.mapArt,
  'marine-insurance': photos.carLot,
  'agriculture-insurance': photos.outdoors
};

export const categoryArt: Record<ProductCategory, ProductImage> = {
  Motor: productArt.privateMotor,
  Medical: productArt.medisure,
  'Life & savings': productArt.phone,
  Investments: productArt.phone,
  Pensions: productArt.pension,
  'Property & business': productArt.service,
  'Personal accident': productArt.personalAccident
};

export const productImage = (id: string, category: ProductCategory): ProductImage => byId[id] ?? categoryArt[category];
