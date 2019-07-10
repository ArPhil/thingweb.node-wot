/********************************************************************************
 * Copyright (c) 2018 - 2019 Contributors to the Eclipse Foundation
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

WoT.fetch("http://localhost:8080/EventSource").then( async (td) => {

	let source = WoT.consume(td);
	console.info("=== TD ===");
	console.info(td);
	console.info("==========");

	source.events.onchange.subscribe(
		x => {
			console.info("onNext:", x);
		},
		e => console.log("onError: %s", e),
		() => {
			console.log("onCompleted");
		}
	);
	console.info("Subscribed");

}).catch( (err) => { console.error("Fetch error:", err.message); });
