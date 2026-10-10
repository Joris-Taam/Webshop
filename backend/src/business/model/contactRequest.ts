// expected fields contactRequest form
export namespace businessmodel {
	export class ContactRequest {
		constructor(
			public name: string,
			public email: string,
			public subject: string,
			public message: string,
			public status: "new" | "inProgress" | "completed",
			public note: string | null,
			public createdAt: string
        ) {}
	}
	

}