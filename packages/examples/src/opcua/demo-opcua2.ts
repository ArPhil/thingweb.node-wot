/********************************************************************************
 * Copyright (c) 2022 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0, or the W3C Software Notice and
 * Document License (2015-05-13) which is available at
 * https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document.
 *
 * SPDX-License-Identifier: EPL-2.0 OR W3C-20150513
 ********************************************************************************/
import { Servient } from "@node-wot/core";
import { OPCUAClientFactory } from "@node-wot/binding-opcua";
import { thingDescription } from "./opcua-coffee-machine-thing-description";

(async () => {
    const servient = new Servient();
    servient.addClientFactory(new OPCUAClientFactory());

    const wot = await servient.start();
    const thing = await wot.consume(thingDescription);

    thing.observeProperty("temperature", async (data) => {
        const dataSchemaValue = await data.value();
        const json = dataSchemaValue.valueOf();
        console.log("------------------------------");
        console.log("temperature : ", json, "m/s");
        console.log("------------------------------");
    });

    await new Promise((resolve) => setTimeout(resolve, 10000));

    await servient.shutdown();
})();
