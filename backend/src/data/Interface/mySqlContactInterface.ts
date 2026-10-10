import { businessmodel } from "../../business/model/contactRequest";
import { mysqlData } from "../models/contactRequest";
import { ContactInterface } from "./contactInterface";

export class MysqlContactInterface implements ContactInterface {
    private contactData!: mysqlData.ContactRequest;

    public constructor() {
        this.contactData = new mysqlData.ContactRequest();
    }
    public async createContact(
        contact: businessmodel.ContactRequest
    ): Promise<void> {
     return await this.contactData.createContact(contact)
    }
        
    
    /**
     *
     * @param id
     * @returns
     * readContact so that matchin contact request is collected.
     * readAllContacts so that all contact requests are collected
     */
    public async readContact(
        email: string,
        createdAt: string
    ): Promise<businessmodel.ContactRequest | null> {
       
        const result= await this.contactData.getContactByKey(email, createdAt)
        return result;
    }
    public async readAllContacts(): Promise<businessmodel.ContactRequest[]> {
        return await this.contactData.getAllContacts();
    }
        
    public async updateContact(
        email: string,
        createdAt: string,
        contact: Partial<businessmodel.ContactRequest>
    ): Promise<void>{
        return await this.contactData.updateContact(email, createdAt, contact);
    }
    public async deleteContact(
        email: string,
        createdAt: string
    ): Promise<void> {
        return await this.contactData.deleteContact(email, createdAt);
    }
    
    }

