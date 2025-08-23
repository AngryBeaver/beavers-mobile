import { NAMESPACE, Settings } from "./Settings.js";

export class DisableItemDragUsersForm extends FormApplication {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "beavers-mobile-disable-item-drag-users",
            title: (game as ReadyGame).i18n?.localize("beaversMobile.settings.disableItemDrag.menu.title") ?? "Restricted Users",
            template: "modules/beavers-mobile/templates/disable-item-drag-users.hbs",
            width: 400,
            submitOnChange: true,  // submit whenever a checkbox is toggled
            closeOnSubmit: true,   // keep the window open after auto-save
            submitOnClose: true,   // as a safety net, submit when closing
        });
    }

    getData() {
        const users = (game as ReadyGame).users?.contents ?? [];
        // @ts-ignore
        const selected = (game as ReadyGame).settings.get(NAMESPACE, Settings.DISABLE_ITEM_DRAG_USERS) as string[];
        return {
            users: users.map(u => ({ id: u.id, name: u.name, selected: selected.includes(u.id) })),
        };
    }

    async _updateObject(_event: Event, formData: any) {
        // formData has shape { user_<id>: "on" }
        const selected: string[] = Object.entries(formData)
            .filter(([key, val]) => key.startsWith("user_") && !!val)
            .map(([key]) => key.substring(5));
        // @ts-ignore
        await (game as ReadyGame).settings.set(NAMESPACE, Settings.DISABLE_ITEM_DRAG_USERS, selected);
    }
}