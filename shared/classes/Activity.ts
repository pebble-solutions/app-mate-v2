import { ActivityType } from "../types/ActivityType";
import { VariableType } from "../types/VariableType";

export class Activity implements ActivityType {
    _id: string;
    label: string;
    description?: string;
    color: string;
    start: Date;
    variables: VariableType[];
    is_active: boolean;

    constructor(activity: any) {
        this._id = activity._id;
        this.label = activity.label;
        this.description = activity.description;
        this.color = !activity.color || !this.isValidColor(activity.color) ? "#262729" : activity.color;
        this.start = new Date(activity.start);
        this.variables = activity.variables;
        this.is_active = activity.is_active;
    }

    setColor(color: string) {
        if (!this.isValidColor(color)) {
            throw new Error('La couleur n\'est pas valide. seuls les codes hexadécimaux sont autorisés.');
        }
        this.color = color;
    }

    isValidColor(color: string): boolean {
        return !!color.match(/^#[0-9a-fA-F]{3,6}$/);
    }
}