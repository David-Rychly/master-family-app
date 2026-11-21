import { Router } from "express";
import { CreateFamilyMember } from "@repo/shared/family";
import { familyService } from "./service";

export const familyRouter = Router();

familyRouter.get("/members", async (_req, res) => {
  res.json(await familyService.listMembers());
});

familyRouter.post("/members", async (req, res) => {
  const parsed = CreateFamilyMember.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid body", issues: parsed.error.issues });
    return;
  }
  res.status(201).json(await familyService.addMember(parsed.data));
});
