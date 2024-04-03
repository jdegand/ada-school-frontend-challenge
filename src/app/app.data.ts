import { InMemoryDbService, RequestInfo, ResponseOptions, STATUS, getStatusText } from "angular-in-memory-web-api";
import { Booking } from "./interface/booking.model";

export class AppData implements InMemoryDbService {

    createDb() {
        const bookings: Booking[] = [
            {
                "id": 1,
                "origin": "Bronx",
                "destination": "Jersey City",
                "occupants": 2,
                "date": new Date("04/30/2024"),
                "time": "09:30 AM"
            },
            {
                "id": 2,
                "origin": "Brooklyn",
                "destination": "Newark",
                "occupants": 1,
                "date": new Date("04/30/2024"),
                "time": "12:30 PM"
            }
        ]

        return { bookings };
    }

    post(reqInfo: RequestInfo) {
        var collection = reqInfo.collection;
        // process only requests as /api/object/:id
        if (!collection)
            return reqInfo.utils.createResponse$(() => {
                const options: ResponseOptions = { status: STATUS.NOT_FOUND };
                return this.finishOptions(options, reqInfo);
            });

        // insert an object to the collection
        let item = reqInfo.utils.getJsonBody(reqInfo.req);

        item["id"] = this.genId(collection);
        collection.push(item);

        // respond
        return reqInfo.utils.createResponse$(() => {
            const options: ResponseOptions =
            {
                body: item,
                status: STATUS.OK
            }
            return this.finishOptions(options, reqInfo);
        });
    }

    genId(collection: any): number {
        return collection.length > 0 ? Math.max(...collection.map((booking: Booking) => booking.id)) + 1 : 11;
    }

    put(reqInfo: RequestInfo) {
        var collection = reqInfo.collection;

        // process only requests as /api/object/:id
        if (!collection || !reqInfo.id)
            return reqInfo.utils.createResponse$(() => {
                const options: ResponseOptions = { status: STATUS.NOT_FOUND };
                return this.finishOptions(options, reqInfo);
            });

        // update an object
        let item = reqInfo.utils.findById(collection, reqInfo.id);
        const body = reqInfo.utils.getJsonBody(reqInfo.req);
        if (item) {
            Object.assign(item, body);
        }
        // respond
        return reqInfo.utils.createResponse$(() => {
            const options: ResponseOptions =
            {
                body: item,
                status: STATUS.OK
            }
            return this.finishOptions(options, reqInfo);
        });
    }

    private finishOptions(options: ResponseOptions, { headers, url }: RequestInfo) {
        options.statusText = getStatusText(options.status ?? 404);
        options.headers = headers;
        options.url = url;
        return options;
    }

}