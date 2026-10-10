import { CategoryDataInterface } from "../../data/Interface/categoriesCrudInterface";
import { businessmodel } from "../model/category";

export class CategoryService {
    constructor(private categoryData: CategoryDataInterface) {}

    public async getOneCategory(name: string) {
        return this.categoryData.readCategory(name);
    }

    public async getAllCategories() {
        return this.categoryData.readCategories();
    }

    public async createCategory(category: businessmodel.category) {
        return this.categoryData.createCategory(category);
    }

    public async updateCategory(name: string, category: businessmodel.category) {
        return this.categoryData.updateCategory(name, category);
    }

    public async deleteCategory(name: string) {
        return this.categoryData.deleteCategory(name);
    }
}
