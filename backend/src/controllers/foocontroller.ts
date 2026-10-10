import * as express from "express";
import { businessmodel } from "../business/model/foo";
import { business } from "../business/service/ServiceFoo";

export class FooController {
	public constructor(private fooService: business.ServiceFoo) {}

	public async getFooById(req: express.Request, res: express.Response): Promise<void> {
		let foo: businessmodel.Foo | null = await this.fooService.getFooById(req.params.id);
		if (foo == null) {
			res.statusCode = 404;
		} else {
			res.status(201).json(JSON.stringify(foo));
		}
	}
}
