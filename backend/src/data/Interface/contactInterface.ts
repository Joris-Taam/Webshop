import { businessmodel } from "../../business/model/contactRequest";

// Interface defining all CRUD types required
export interface ContactInterface {

	/** Create a new contact request.
     * Excluding status and created_at because they are automatically set
     */

	createContact(contact: businessmodel.ContactRequest): Promise<void>;
    // Collects one specific contact Request with composite key from email and created_at
	readContact(
        email: string, 
        createdAt: string
    ): Promise<businessmodel.ContactRequest | null>;
// Collects all contactRequests
    readAllContacts(): Promise<businessmodel.ContactRequest[]>;
  // Partial so that the admin can update what he needs to update
	updateContact(
        email: string, 
        createdAt: string,
        data: Partial<businessmodel.ContactRequest>
    ): Promise<void>;
    // Delete so Admin can delete
	deleteContact( 
        email: string, 
        createdAt: string
    ): Promise<void>;
}
