import { businessmodel } from "../../business/model/category";

export interface CategoryDataInterface {
    createCategory(category: businessmodel.category): Promise<string>;
    readCategory(name: string): Promise<businessmodel.category | null>;
    readCategories(): Promise<businessmodel.category[]>;
    updateCategory(name: string, category: businessmodel.category): Promise<boolean>;
    deleteCategory(name: string): Promise<boolean>;
}
