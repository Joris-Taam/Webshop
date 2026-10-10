import { Request, Response } from "express";
import { business } from "../business/service/contactService";

export class ContactController {
	private service: business.ContactService;

	constructor(service: business.ContactService) {
		this.service = service;
	}

	public async createContact(req: Request, res: Response) {
		try {
			await this.service.createContact(req.body);
			res.status(201).json({ message: "Contactverzoek aangemaakt" });
		} catch (error: any) {
			res.status(400).json({ error: error.message });
		}
	}

	public async getAllContacts(req: Request, res: Response) {
		try {
			const result = await this.service.getAllContacts();
			res.json(result);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	public async getOneContact(req: Request, res: Response) {
		const { email, createdAt } = req.params;

		try {
			const result = await this.service.getContact(email, createdAt);

			if (!result) {
				return res.status(404).json({ error: "Contact request not found" });
			}

			res.json(result);
		} catch (error: any) {
			res.status(400).json({ error: error.message });
		}
	}

	public async updateContact(req: Request, res: Response) {
		const { email, createdAt } = req.params;

		try {
			await this.service.updateContact(email, createdAt, req.body);
			res.json({ message: "Contact request updated" });
		} catch (error: any) {
			res.status(400).json({ error: error.message });
		}
	}

	public async deleteContact(req: Request, res: Response) {
		const { email, createdAt } = req.params;

		try {
			await this.service.deleteContact(email, createdAt);
			res.json({ message: "Contact request deleted" });
		} catch (error: any) {
			res.status(400).json({ error: error.message });
		}
	}
}
