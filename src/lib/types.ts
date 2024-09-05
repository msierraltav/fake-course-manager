import { UUID } from "crypto";

export interface TCourse{
    id?: UUID;
    subject: string;
    courseNumber: string;
    description: string;
}