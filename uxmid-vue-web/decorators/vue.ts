/*!
 * This file is part of `decorators` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 UXmid Inc. All rights reserved. 
 */

import component, { mixins } from "vue-class-component";
import { Prop as config, Prop as prop, Model as model, Watch as watch, Inject as inject, Provide as provide } from "vue-property-decorator";

// 注册路由相关钩子函数
component.registerHooks
([
    "beforeRouteEnter",
    "beforeRouteLeave",
    "beforeRouteUpdate"
]);

export { component, mixins, config, prop, model, watch, inject, provide };
