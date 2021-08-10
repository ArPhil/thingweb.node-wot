/********************************************************************************
 * Copyright (c) 2018 - 2020 Contributors to the Eclipse Foundation
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

/**
 * HTTP client Factory
 */

import { ProtocolClientFactory, ProtocolClient } from "@node-wot/core";
import { HttpConfig } from "./http";
import HttpClient from './http-client';
import OAuthManager from "./oauth-manager";

export default class HttpClientFactory implements ProtocolClientFactory {

  public readonly scheme: string = "http";
  private config: HttpConfig = null;
  private oAuthManager: OAuthManager = new OAuthManager();

  constructor(config: HttpConfig = null) {
    this.config = config;
  }

  public getClient(): ProtocolClient {
    // HTTP over HTTPS proxy requires HttpsClient
    if (this.config && this.config.proxy && this.config.proxy.href && this.config.proxy.href.startsWith("https:")) {
      console.warn("[binding-http]",`HttpClientFactory creating client for 'https' due to secure proxy configuration`);
      return new HttpClient(this.config, true, this.oAuthManager);
    } else {
      console.debug("[binding-http]",`HttpClientFactory creating client for '${this.scheme}'`);
      return new HttpClient(this.config);
    }
  }

  public init(): boolean {
    // console.info(`HttpClientFactory for '${HttpClientFactory.scheme}' initializing`);
    // TODO uncomment info if something is executed here
    return true;
  }

  public destroy(): boolean {
    // console.info(`HttpClientFactory for '${HttpClientFactory.scheme}' destroyed`);
    // TODO uncomment info if something is executed here
    return true;
  }
}
