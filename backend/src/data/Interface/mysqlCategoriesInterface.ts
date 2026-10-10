import { CategoryDataInterface } from "./categoriesCrudInterface";
import { businessmodel } from "../../business/model/category";
import { CategoryModel } from "../models/categoryModels";

export class MysqlCategoryInterface implements CategoryDataInterface {

    private categoryModel: CategoryModel = new CategoryModel();

    public createCategory(category: businessmodel.category): Promise<string> {
        return this.categoryModel.createCategory(category);
    }

    public readCategory(name: string): Promise<businessmodel.category | null> {
        return this.categoryModel.getCategory(name);
    }

    public readCategories(): Promise<businessmodel.category[]> {
        return this.categoryModel.getCategories();
    }

    public updateCategory(name: string, category: businessmodel.category): Promise<boolean> {
        return this.categoryModel.updateCategory(name, category);
    }

    public deleteCategory(name: string): Promise<boolean> {
        return this.categoryModel.deleteCategory(name);
    }
}
