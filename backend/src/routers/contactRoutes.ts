import { Router } from "express";
import { ContactController } from "../controllers/ContactController";
import { business } from "../business/service/contactService";
import { MysqlContactInterface } from "../data/Interface/mySqlContactInterface";

const router = Router();

const repo = new MysqlContactInterface();
const service = new business.ContactService(repo);
const controller = new ContactController(service);

router.post("/", (req, res) => controller.createContact(req, res));
router.get("/", (req, res) => controller.getAllContacts(req, res));
router.get("/:email/:createdAt", (req, res) => controller.getOneContact(req, res));
router.put("/:email/:createdAt", (req, res) => controller.updateContact(req, res));
router.delete("/:email/:createdAt", (req, res) => controller.deleteContact(req, res));

export default router;
