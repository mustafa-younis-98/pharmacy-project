export interface CreateMedicine {
  name: string;
  genericName: string;
  barcode: string;

  categoryId: string;
  supplierId: string;

  description: string;
  price: number;
  costPrice: number;
  stockQuantity: number;
  reorderLevel: number;
  expiryDate: string;
  batchNumber: string;
  requiresPrescription: boolean;
  isActive: boolean;
}
