import { error } from "console";
import { ContactInterface } from "../../data/Interface/contactInterface";
import { businessmodel } from "../model/contactRequest";

export namespace business {
    export class ContactService {
        public constructor(private contactData: ContactInterface) {}

        /**
         * Create a new contact request
         * Basic Validation
         */
 // When creating a contact request, validate required fields and types.
        public async createContact(data: businessmodel.ContactRequest): Promise<void>  {
            if (!data.name || !data.email || !data.subject || !data.message){
                throw new Error("Missing required fields");
            }
     // Build the business model
     const newContact = new businessmodel.ContactRequest(
        data.name,
        data.email,
        data.subject,
        data.message,
        "new",
        null,
        new Date().toISOString().slice(0, 19).replace("T", " ")

     );
        return await this.contactData.createContact(newContact);
        }
    // Retrieve a single contact request
    public async getContact(
        email: string,
        createdAt: string
    ): Promise<businessmodel.ContactRequest | null> {
        let result = await this.contactData.readContact(email, createdAt);
        return result;
    } 
    /**
         * Retrieve all contact requests (for admin)
         */
    public async getAllContacts(): Promise<businessmodel.ContactRequest[]>{
        let result = await this.contactData.readAllContacts();
        return result;
    }
     /**
         * Update a contact request (admin only)
         */
        public async updateContact(
            email: string,
            createdAt: string,
            updates: Partial<businessmodel.ContactRequest>
        ): Promise<void> {

            return await this.contactData.updateContact(email, createdAt, updates);
        }

        /**
         * Delete a contact request (admin only)
         */
        public async deleteContact(
            email: string,
            createdAt: string
        ): Promise<void> {

            return await this.contactData.deleteContact(email, createdAt);
        }       
    }
}