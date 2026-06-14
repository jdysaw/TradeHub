export const getCategoryImg = (name) => {
  const n = name.toLowerCase()

  // 品牌 SVG 路径图标生成器（单 path，用于品牌 Logo）
  const svgPathIcon = (path, viewBox = '0 0 24 24', color = '#fff', bg = '#f5f5f7') => {
    return 'data:image/svg+xml,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" rx="16" fill="' + bg + '"/><svg x="20" y="20" width="40" height="40" viewBox="' + viewBox + '"><path fill="' + color + '" d="' + path + '"/></svg></svg>'
    )
  }

  // 复合矢量图标生成器（支持多元素 SVG 内容，用于家电/工具等复杂图标）
  const svgCustomIcon = (innerSvg, bg = '#f0f7ff') => {
    return 'data:image/svg+xml,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" rx="16" fill="' + bg + '"/><svg x="14" y="14" width="52" height="52" viewBox="0 0 48 48">' + innerSvg + '</svg></svg>'
    )
  }

  // Emoji 兜底图标（其余品类使用）
  const emojiIcon = (emoji, bg = '#f0f7ff') => {
    return 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" rx="16" fill="' + bg + '"/><text x="40" y="44" font-size="36" text-anchor="middle" dominant-baseline="central">' + emoji + '</text></svg>')
  }

  // ===== 品牌 SVG Path 数据（来自 Simple Icons） =====
  const paths = {
    apple: 'M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701',
    huawei: 'M3.67 6.14S1.82 7.91 1.72 9.78v.35c.08 1.51 1.22 2.4 1.22 2.4 1.83 1.79 6.26 4.04 7.3 4.55 0 0 .06.03.1-.01l.02-.04v-.04C7.52 10.8 3.67 6.14 3.67 6.14zM9.65 18.6c-.02-.08-.1-.08-.1-.08l-7.38.26c.8 1.43 2.15 2.53 3.56 2.2.96-.25 3.16-1.78 3.88-2.3.06-.05.04-.09.04-.09zm.08-.78C6.49 15.63.21 12.28.21 12.28c-.15.46-.2.9-.21 1.3v.07c0 1.07.4 1.82.4 1.82.8 1.69 2.34 2.2 2.34 2.2.7.3 1.4.31 1.4.31.12.02 4.4 0 5.54 0 .05 0 .08-.05.08-.05v-.06c0-.03-.03-.05-.03-.05zM9.06 3.19a3.42 3.42 0 00-2.57 3.15v.41c.03.6.16 1.05.16 1.05.66 2.9 3.86 7.65 4.55 8.65.05.05.1.03.1.03a.1.1 0 00.06-.1c1.06-10.6-1.11-13.42-1.11-13.42-.32.02-1.19.23-1.19.23zm8.299 2.27s-.49-1.8-2.44-2.28c0 0-.57-.14-1.17-.22 0 0-2.18 2.81-1.12 13.43.01.07.06.08.06.08.07.03.1-.03.1-.03.72-1.03 3.9-5.76 4.55-8.64 0 0 .36-1.4.02-2.34zm-2.92 13.07s-.07 0-.09.05c0 0-.01.07.03.1.7.51 2.85 2 3.88 2.3 0 0 .16.05.43.06h.14c.69-.02 1.9-.37 3-2.26l-7.4-.25zm7.83-8.41c.14-2.06-1.94-3.97-1.94-3.98 0 0-3.85 4.66-6.67 10.8 0 0-.03.08.02.13l.04.01h.06c1.06-.53 5.46-2.77 7.28-4.54 0 0 1.15-.93 1.21-2.42zm1.52 2.14s-6.28 3.37-9.52 5.55c0 0-.05.04-.03.11 0 0 .03.06.07.06 1.16 0 5.56 0 5.67-.02 0 0 .57-.02 1.27-.29 0 0 1.56-.5 2.37-2.27 0 0 .73-1.45.17-3.14z',
    xiaomi: 'M12 0C8.016 0 4.756.255 2.493 2.516.23 4.776 0 8.033 0 12.012c0 3.98.23 7.235 2.494 9.497C4.757 23.77 8.017 24 12 24c3.983 0 7.243-.23 9.506-2.491C23.77 19.247 24 15.99 24 12.012c0-3.984-.233-7.243-2.502-9.504C19.234.252 15.978 0 12 0zM4.906 7.405h5.624c1.47 0 3.007.068 3.764.827.746.746.827 2.233.83 3.676v4.54a.15.15 0 0 1-.152.147h-1.947a.15.15 0 0 1-.152-.148V11.83c-.002-.806-.048-1.634-.464-2.051-.358-.36-1.026-.441-1.72-.458H7.158a.15.15 0 0 0-.151.147v6.98a.15.15 0 0 1-.152.148H4.906a.15.15 0 0 1-.15-.148V7.554a.15.15 0 0 1 .15-.149zm12.131 0h1.949a.15.15 0 0 1 .15.15v8.892a.15.15 0 0 1-.15.148h-1.949a.15.15 0 0 1-.151-.148V7.554a.15.15 0 0 1 .151-.149zM8.92 10.948h2.046c.083 0 .15.066.15.147v5.352a.15.15 0 0 1-.15.148H8.92a.15.15 0 0 1-.152-.148v-5.352a.15.15 0 0 1 .152-.147Z',
    oppo: 'M2.85 12.786h-.001C1.639 12.774.858 12.2.858 11.321s.781-1.452 1.99-1.465c1.21.013 1.992.588 1.992 1.465s-.782 1.453-1.99 1.465zm.034-3.638h-.073C1.156 9.175 0 10.068 0 11.32s1.156 2.147 2.811 2.174h.073c1.655-.027 2.811-.921 2.811-2.174S4.54 9.175 2.885 9.148zm18.27 3.638c-1.21-.012-1.992-.587-1.992-1.465s.782-1.452 1.991-1.465c1.21.013 1.991.588 1.991 1.465s-.781 1.453-1.99 1.465zm.035-3.638h-.073c-1.655.027-2.811.92-2.811 2.173s1.156 2.147 2.81 2.174h.074C22.844 13.468 24 12.574 24 11.32s-1.156-2.146-2.811-2.173zm-6.126 3.638c-1.21-.012-1.99-.587-1.99-1.465s.78-1.452 1.99-1.465c1.21.013 1.991.588 1.991 1.465s-.781 1.453-1.99 1.465zm.036-3.638h-.073c-.789.013-1.464.222-1.955.574v-.37h-.857v5.5h.857v-1.931c.49.351 1.166.56 1.954.574h.074c1.655-.027 2.81-.921 2.81-2.174s-1.155-2.146-2.81-2.173zm-6.144 3.638c-1.21-.012-1.99-.587-1.99-1.465s.78-1.452 1.99-1.465c1.21.013 1.991.588 1.991 1.465s-.781 1.453-1.99 1.465zm.037-3.638H8.92c-.789.013-1.464.222-1.955.574v-.37h-.856v5.5h.856v-1.931c.491.351 1.166.56 1.955.574a3.728 3.728 0 0 0 .073 0c1.655-.027 2.811-.921 2.811-2.174s-1.156-2.146-2.81-2.173z',
    vivo: 'M19.604 14.101c-1.159 0-1.262-.95-1.262-1.24 0-.29.103-1.242 1.262-1.242h2.062c1.16 0 1.263.951 1.263 1.242 0 .29-.104 1.24-1.263 1.24m-2.062-3.527c-2.142 0-2.333 1.752-2.333 2.287 0 .535.19 2.286 2.333 2.286h2.062c2.143 0 2.334-1.751 2.334-2.286 0-.535-.19-2.287-2.334-2.287m-5.477.107c-.286 0-.345.05-.456.213-.11.164-2.022 3.082-2.022 3.082-.06.09-.126.126-.206.126-.08 0-.145-.036-.206-.126 0 0-1.912-2.918-2.022-3.082-.11-.164-.17-.213-.456-.213h-.668c-.154 0-.224.12-.127.267l2.283 3.467c.354.521.614.732 1.196.732s.842-.21 1.196-.732l2.284-3.467c.096-.146.026-.267-.128-.267m-8.876.284c0-.203.08-.284.283-.284h.505c.203 0 .283.08.283.283v3.9c0 .202-.08.283-.283.283h-.505c-.203 0-.283-.08-.283-.283zm-1.769-.285c-.287 0-.346.05-.456.213-.11.164-2.022 3.082-2.022 3.082-.061.09-.126.126-.206.126-.08 0-.145-.036-.206-.126 0 0-1.912-2.918-2.023-3.082-.11-.164-.169-.213-.455-.213H.175c-.171 0-.224.12-.127.267l2.283 3.467c.355.521.615.732 1.197.732.582 0 .842-.21 1.196-.732l2.283-3.467c.097-.146.044-.267-.127-.267m1.055-.893c-.165-.164-.165-.295 0-.46l.351-.351c.165-.165.296-.165.46 0l.352.351c.165.165.165.296 0 .46l-.352.352c-.164.165-.295.165-.46 0z',
    honor: 'M2.601 9.753v1.823H.807V9.753H0v4.498h.807v-1.874h1.794v1.874h.807V9.753h-.807Zm18.671.801h.898c.369 0 .667.297.667.662a.665.665 0 0 1-.667.663h-.898v-1.325Zm-.806-.801v4.498h.806v-2.002l1.68 2.002H24l-1.376-1.64a1.462 1.462 0 0 0-.444-2.858h-1.716.002Zm-7.63-.014v2.807l-1.959-2.807h-.644v4.498h.807v-2.82l1.968 2.82h.633V9.739h-.805Zm-7.532 2.26c0-.832.68-1.506 1.517-1.506A1.51 1.51 0 0 1 8.337 12c0 .832-.679 1.506-1.516 1.506-.403 0-.789-.159-1.073-.441A1.504 1.504 0 0 1 5.304 12v-.001ZM4.497 12c0 .933.566 1.774 1.434 2.132.869.357 1.868.16 2.533-.5.664-.66.863-1.653.503-2.515a2.324 2.324 0 0 0-2.146-1.425 2.316 2.316 0 0 0-2.323 2.307L4.497 12Zm11.04-.001a1.513 1.513 0 0 1 1.518-1.506c.838 0 1.516.675 1.516 1.507a1.513 1.513 0 0 1-1.518 1.506c-.402 0-.788-.159-1.072-.441a1.5 1.5 0 0 1-.444-1.066ZM14.73 12c0 .933.566 1.774 1.434 2.132.868.357 1.868.16 2.532-.5.665-.66.864-1.653.504-2.515a2.325 2.325 0 0 0-2.147-1.425 2.316 2.316 0 0 0-2.323 2.307V12Z',
    oneplus: 'M0 3.74V24h20.26V12.428h-2.256v9.317H2.254V5.995h9.318V3.742zM18.004 0v3.74h-3.758v2.256h3.758v3.758h2.255V5.996H24V3.74h-3.758V0zm-6.45 18.756V8.862H9.562c0 .682-.228 1.189-.577 1.504-.367.297-.91.437-1.556.437h-.245v1.625h2.133v6.31h2.237z'
  }

  // ===== 精细矢量图标（viewBox 0 0 48 48，多元素组合绘制） =====
  const customIcons = {
    // 吸尘器：竖直长柄 + 电机主体 + 宽吸头底座
    '吸尘器': svgCustomIcon(
      '<rect x="22" y="2" width="4" height="14" rx="2" fill="#5b7a9d"/>' +
      '<rect x="16" y="16" width="16" height="14" rx="4" fill="#5b7a9d"/>' +
      '<circle cx="24" cy="23" r="4" fill="#fff" fill-opacity=".25"/>' +
      '<rect x="12" y="32" width="24" height="5" rx="2.5" fill="#7a9dbc"/>' +
      '<rect x="10" y="37" width="28" height="7" rx="3" fill="#5b7a9d"/>' +
      '<rect x="14" y="39" width="20" height="3" rx="1" fill="#fff" fill-opacity=".15"/>',
      '#f0fff0'
    ),
    // 豆浆机：带盖的机身 + 侧面把手 + 底部控制面板按钮
    '豆浆机': svgCustomIcon(
      '<rect x="14" y="2" width="18" height="5" rx="2.5" fill="#7a9dbc"/>' +
      '<path d="M12 7h22v28c0 3-2 5-5 5H17c-3 0-5-2-5-5V7z" fill="#5b7a9d"/>' +
      '<rect x="16" y="11" width="14" height="17" rx="2" fill="#fff" fill-opacity=".2"/>' +
      '<rect x="34" y="14" width="6" height="10" rx="3" fill="#7a9dbc"/>' +
      '<circle cx="20" cy="36" r="2" fill="#fff" fill-opacity=".4"/>' +
      '<circle cx="28" cy="36" r="2" fill="#fff" fill-opacity=".4"/>' +
      '<rect x="23" y="36" width="2" height="2" rx="1" fill="#fff" fill-opacity=".3"/>',
      '#fef5e7'
    ),
    // 暖风机：矩形机身 + 出风口水平栅格 + 红色波浪热气线
    '暖风机': svgCustomIcon(
      '<path d="M14 9 Q16 3 18 9" fill="none" stroke="#e74c3c" stroke-width="2.5" stroke-linecap="round"/>' +
      '<path d="M22 9 Q24 3 26 9" fill="none" stroke="#e74c3c" stroke-width="2.5" stroke-linecap="round"/>' +
      '<path d="M30 9 Q32 3 34 9" fill="none" stroke="#e74c3c" stroke-width="2.5" stroke-linecap="round"/>' +
      '<rect x="8" y="11" width="32" height="31" rx="4" fill="#5b7a9d"/>' +
      '<rect x="12" y="15" width="24" height="3" rx="1.5" fill="#fff" fill-opacity=".25"/>' +
      '<rect x="12" y="21" width="24" height="3" rx="1.5" fill="#fff" fill-opacity=".25"/>' +
      '<rect x="12" y="27" width="24" height="3" rx="1.5" fill="#fff" fill-opacity=".25"/>' +
      '<rect x="12" y="33" width="24" height="3" rx="1.5" fill="#fff" fill-opacity=".25"/>' +
      '<circle cx="24" cy="40" r="2" fill="#fff" fill-opacity=".3"/>',
      '#fff5f0'
    ),
    // 取暖器：顶部横梁 + 竖直发热管（红色） + 底部支脚
    '取暖器': svgCustomIcon(
      '<rect x="8" y="4" width="32" height="5" rx="2.5" fill="#4a6a8a"/>' +
      '<rect x="12" y="9" width="5" height="26" rx="2.5" fill="#e74c3c" fill-opacity=".75"/>' +
      '<rect x="21.5" y="9" width="5" height="26" rx="2.5" fill="#e74c3c" fill-opacity=".75"/>' +
      '<rect x="31" y="9" width="5" height="26" rx="2.5" fill="#e74c3c" fill-opacity=".75"/>' +
      '<rect x="8" y="35" width="32" height="5" rx="2.5" fill="#4a6a8a"/>' +
      '<rect x="11" y="40" width="6" height="5" rx="1.5" fill="#5b7a9d"/>' +
      '<rect x="31" y="40" width="6" height="5" rx="1.5" fill="#5b7a9d"/>',
      '#fff5f0'
    ),
    // 烤箱：方形箱体 + 顶部三个旋钮 + 透明玻璃门 + 门把手
    '烤箱': svgCustomIcon(
      '<rect x="6" y="6" width="36" height="36" rx="4" fill="#5b7a9d"/>' +
      '<circle cx="14" cy="12" r="2.5" fill="#fff" fill-opacity=".5"/>' +
      '<circle cx="24" cy="12" r="2.5" fill="#fff" fill-opacity=".5"/>' +
      '<circle cx="34" cy="12" r="2.5" fill="#fff" fill-opacity=".5"/>' +
      '<rect x="10" y="18" width="28" height="20" rx="2" fill="#7ab8d9" fill-opacity=".35"/>' +
      '<rect x="14" y="22" width="20" height="12" rx="1.5" fill="#fff" fill-opacity=".18"/>' +
      '<rect x="20" y="38" width="8" height="2" rx="1" fill="#fff" fill-opacity=".4"/>',
      '#fff5f0'
    ),
    // 生活电器：电熨斗侧面轮廓（三角底板 + 手柄）
    '生活电器': svgCustomIcon(
      '<rect x="18" y="8" width="14" height="10" rx="4" fill="#7a9dbc"/>' +
      '<rect x="22" y="4" width="6" height="6" rx="2" fill="#5b7a9d"/>' +
      '<path d="M10 18h28l-4 20H10V18z" fill="#5b7a9d"/>' +
      '<path d="M10 32h24l-2 6H10v-6z" fill="#4a6a8a"/>' +
      '<rect x="14" y="22" width="16" height="3" rx="1" fill="#fff" fill-opacity=".15"/>' +
      '<rect x="14" y="28" width="12" height="2" rx="1" fill="#fff" fill-opacity=".15"/>',
      '#f0f7ff'
    ),
    // 卷发器：对角线卷发棒 + 夹片 + 底部电线
    '卷发器': svgCustomIcon(
      '<rect x="20" y="2" width="8" height="6" rx="3" fill="#c07ab8"/>' +
      '<rect x="21" y="8" width="6" height="28" rx="3" fill="#9b59b6"/>' +
      '<rect x="28" y="10" width="4" height="20" rx="1.5" fill="#c07ab8"/>' +
      '<rect x="27" y="8" width="6" height="4" rx="1.5" fill="#8e44ad"/>' +
      '<circle cx="24" cy="22" r="1.5" fill="#fff" fill-opacity=".3"/>' +
      '<path d="M24 36 Q24 44 30 44" fill="none" stroke="#8e8e8e" stroke-width="2" stroke-linecap="round"/>',
      '#fef5e7'
    ),
    // 转换器：插座转换器（盒体 + 插孔 + 底部插脚）
    '转换器': svgCustomIcon(
      '<rect x="10" y="8" width="28" height="24" rx="4" fill="#5b7a9d"/>' +
      '<rect x="16" y="13" width="5" height="7" rx="1" fill="#fff" fill-opacity=".35"/>' +
      '<rect x="27" y="13" width="5" height="7" rx="1" fill="#fff" fill-opacity=".35"/>' +
      '<rect x="19" y="24" width="10" height="4" rx="1.5" fill="#fff" fill-opacity=".25"/>' +
      '<rect x="16" y="34" width="4" height="8" rx="1.5" fill="#7a9dbc"/>' +
      '<rect x="28" y="34" width="4" height="8" rx="1.5" fill="#7a9dbc"/>',
      '#f0f7ff'
    ),
    // 平板电脑：大屏平板设备（无键盘），竖屏圆角机身 + 窄边框大屏幕 + 底部导航条
    '平板电脑': svgCustomIcon(
      '<rect x="10" y="4" width="28" height="40" rx="3" fill="#5b7a9d"/>' +
      '<rect x="13" y="7" width="22" height="32" rx="1.5" fill="#a8d4f0" fill-opacity=".45"/>' +
      '<rect x="16" y="11" width="16" height="2" rx="1" fill="#fff" fill-opacity=".2"/>' +
      '<rect x="16" y="15" width="10" height="2" rx="1" fill="#fff" fill-opacity=".15"/>' +
      '<rect x="16" y="19" width="14" height="8" rx="1" fill="#fff" fill-opacity=".12"/>' +
      '<rect x="20" y="41" width="8" height="1.5" rx=".75" fill="#fff" fill-opacity=".3"/>',
      '#f0f7ff'
    ),
    // 电脑主机：立式台式机箱 + 光驱槽 + 电源指示灯 + 散热栅格
    '电脑主机': svgCustomIcon(
      '<rect x="12" y="4" width="24" height="40" rx="3" fill="#5b7a9d"/>' +
      '<rect x="16" y="8" width="16" height="3" rx="1" fill="#4a6a8a"/>' +
      '<circle cx="18" cy="9.5" r=".8" fill="#fff" fill-opacity=".3"/>' +
      '<circle cx="24" cy="16" r="2" fill="#4cd964" fill-opacity=".7"/>' +
      '<rect x="16" y="22" width="16" height="18" rx="1.5" fill="#4a6a8a" fill-opacity=".5"/>' +
      '<rect x="18" y="24" width="12" height="1.5" rx=".75" fill="#fff" fill-opacity=".15"/>' +
      '<rect x="18" y="27.5" width="12" height="1.5" rx=".75" fill="#fff" fill-opacity=".15"/>' +
      '<rect x="18" y="31" width="12" height="1.5" rx=".75" fill="#fff" fill-opacity=".15"/>' +
      '<rect x="18" y="34.5" width="12" height="1.5" rx=".75" fill="#fff" fill-opacity=".15"/>',
      '#f0f7ff'
    ),
    // 二手电脑：翻盖笔记本电脑 + 右下角绿色循环回收标志
    '二手电脑': svgCustomIcon(
      '<rect x="8" y="4" width="32" height="22" rx="2" fill="#5b7a9d"/>' +
      '<rect x="11" y="7" width="26" height="16" rx="1" fill="#a8d4f0" fill-opacity=".4"/>' +
      '<rect x="14" y="10" width="14" height="2" rx="1" fill="#fff" fill-opacity=".2"/>' +
      '<rect x="14" y="14" width="10" height="2" rx="1" fill="#fff" fill-opacity=".15"/>' +
      '<path d="M6 26h36l-1 2H7z" fill="#7a9dbc"/>' +
      '<rect x="6" y="28" width="36" height="6" rx="2" fill="#5b7a9d"/>' +
      '<rect x="14" y="30" width="20" height="2" rx=".5" fill="#4a6a8a" fill-opacity=".4"/>' +
      '<circle cx="38" cy="40" r="6" fill="#34c759"/>' +
      '<path d="M36 37.5l1.2-2 1.2 2zM34.5 40.8l2-1.2v2.4zM39.5 40.8l-2-1.2v2.4z" fill="#fff"/>' +
      '<path d="M35.5 38.5a3 3 0 0 1 4 0M35.5 42a3 3 0 0 0 2-1M39.5 42a3 3 0 0 1-2-1" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round"/>',
      '#f0f7ff'
    ),
    // 二手手机：触屏智能手机 + 右下角绿色循环回收标志
    '二手手机': svgCustomIcon(
      '<rect x="14" y="4" width="20" height="36" rx="3" fill="#5b7a9d"/>' +
      '<rect x="17" y="8" width="14" height="26" rx="1" fill="#a8d4f0" fill-opacity=".45"/>' +
      '<rect x="19" y="12" width="10" height="2" rx="1" fill="#fff" fill-opacity=".2"/>' +
      '<rect x="19" y="16" width="7" height="2" rx="1" fill="#fff" fill-opacity=".15"/>' +
      '<rect x="19" y="20" width="10" height="6" rx="1" fill="#fff" fill-opacity=".12"/>' +
      '<rect x="21" y="36" width="6" height="1.5" rx=".75" fill="#fff" fill-opacity=".3"/>' +
      '<circle cx="38" cy="40" r="6" fill="#34c759"/>' +
      '<path d="M36 37.5l1.2-2 1.2 2zM34.5 40.8l2-1.2v2.4zM39.5 40.8l-2-1.2v2.4z" fill="#fff"/>' +
      '<path d="M35.5 38.5a3 3 0 0 1 4 0M35.5 42a3 3 0 0 0 2-1M39.5 42a3 3 0 0 1-2-1" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round"/>',
      '#f0f7ff'
    ),
    // 单反相机：宽机身 + 取景器凸起 + 大尺寸多环镜头（与普通相机明显区别）
    '单反相机': svgCustomIcon(
      '<rect x="6" y="16" width="36" height="22" rx="3" fill="#5b7a9d"/>' +
      '<rect x="28" y="10" width="10" height="8" rx="2" fill="#4a6a8a"/>' +
      '<rect x="14" y="12" width="8" height="4" rx="1" fill="#4a6a8a"/>' +
      '<circle cx="22" cy="27" r="10" fill="#4a6a8a"/>' +
      '<circle cx="22" cy="27" r="7" fill="#3a5a7a"/>' +
      '<circle cx="22" cy="27" r="4.5" fill="#2a4a6a"/>' +
      '<circle cx="22" cy="27" r="2.5" fill="#a8d4f0" fill-opacity=".4"/>' +
      '<rect x="36" y="18" width="4" height="18" rx="1.5" fill="#4a6a8a"/>',
      '#f0f7ff'
    ),
    // 无人机：四轴飞行器（中央机身 + 4条机臂 + 4个螺旋桨圆环 + 底部摄像头）
    '无人机': svgCustomIcon(
      '<rect x="18" y="18" width="12" height="12" rx="3" fill="#5b7a9d"/>' +
      '<circle cx="24" cy="24" r="2.5" fill="#a8d4f0" fill-opacity=".5"/>' +
      '<line x1="20" y1="20" x2="10" y2="10" stroke="#7a9dbc" stroke-width="2.5" stroke-linecap="round"/>' +
      '<line x1="28" y1="20" x2="38" y2="10" stroke="#7a9dbc" stroke-width="2.5" stroke-linecap="round"/>' +
      '<line x1="20" y1="28" x2="10" y2="38" stroke="#7a9dbc" stroke-width="2.5" stroke-linecap="round"/>' +
      '<line x1="28" y1="28" x2="38" y2="38" stroke="#7a9dbc" stroke-width="2.5" stroke-linecap="round"/>' +
      '<circle cx="10" cy="10" r="5" fill="#5b7a9d" fill-opacity=".6"/>' +
      '<circle cx="38" cy="10" r="5" fill="#5b7a9d" fill-opacity=".6"/>' +
      '<circle cx="10" cy="38" r="5" fill="#5b7a9d" fill-opacity=".6"/>' +
      '<circle cx="38" cy="38" r="5" fill="#5b7a9d" fill-opacity=".6"/>' +
      '<line x1="7" y1="10" x2="13" y2="10" stroke="#fff" stroke-width="1" stroke-opacity=".4"/>' +
      '<line x1="10" y1="7" x2="10" y2="13" stroke="#fff" stroke-width="1" stroke-opacity=".4"/>' +
      '<line x1="35" y1="10" x2="41" y2="10" stroke="#fff" stroke-width="1" stroke-opacity=".4"/>' +
      '<line x1="38" y1="7" x2="38" y2="13" stroke="#fff" stroke-width="1" stroke-opacity=".4"/>' +
      '<line x1="7" y1="38" x2="13" y2="38" stroke="#fff" stroke-width="1" stroke-opacity=".4"/>' +
      '<line x1="10" y1="35" x2="10" y2="41" stroke="#fff" stroke-width="1" stroke-opacity=".4"/>' +
      '<line x1="35" y1="38" x2="41" y2="38" stroke="#fff" stroke-width="1" stroke-opacity=".4"/>' +
      '<line x1="38" y1="35" x2="38" y2="41" stroke="#fff" stroke-width="1" stroke-opacity=".4"/>',
      '#f0f7ff'
    ),
    // 电玩动漫：复古街机柜台（屏幕 + 操控面板 + 摇杆 + 按钮）
    '电玩动漫': svgCustomIcon(
      '<rect x="10" y="4" width="28" height="40" rx="3" fill="#5b7a9d"/>' +
      '<rect x="14" y="8" width="20" height="16" rx="2" fill="#2a4a6a"/>' +
      '<rect x="20" y="13" width="4" height="6" rx="1" fill="#4cd964" fill-opacity=".6"/>' +
      '<rect x="26" y="15" width="3" height="4" rx="1" fill="#ff6b6b" fill-opacity=".5"/>' +
      '<rect x="14" y="28" width="20" height="12" rx="1.5" fill="#4a6a8a"/>' +
      '<circle cx="20" cy="34" r="2" fill="#7a9dbc"/>' +
      '<rect x="19" y="29" width="2" height="5" rx="1" fill="#7a9dbc"/>' +
      '<circle cx="29" cy="31" r="1.8" fill="#e74c3c" fill-opacity=".7"/>' +
      '<circle cx="33" cy="34" r="1.8" fill="#3498db" fill-opacity=".7"/>',
      '#f5f0ff'
    ),
    // 键盘鼠标：左侧键盘（带按键行和空格键） + 右侧椭圆鼠标（双键+滚轮）
    '键盘鼠标': svgCustomIcon(
      '<rect x="2" y="22" width="32" height="18" rx="2" fill="#5b7a9d"/>' +
      '<rect x="5" y="25" width="26" height="3" rx="1" fill="#4a6a8a" fill-opacity=".6"/>' +
      '<rect x="5" y="29.5" width="26" height="3" rx="1" fill="#4a6a8a" fill-opacity=".6"/>' +
      '<rect x="5" y="34" width="26" height="3" rx="1" fill="#4a6a8a" fill-opacity=".6"/>' +
      '<rect x="6" y="25.5" width="4" height="2" rx=".5" fill="#fff" fill-opacity=".15"/>' +
      '<rect x="11" y="25.5" width="4" height="2" rx=".5" fill="#fff" fill-opacity=".15"/>' +
      '<rect x="16" y="25.5" width="4" height="2" rx=".5" fill="#fff" fill-opacity=".15"/>' +
      '<rect x="21" y="25.5" width="4" height="2" rx=".5" fill="#fff" fill-opacity=".15"/>' +
      '<rect x="26" y="25.5" width="4" height="2" rx=".5" fill="#fff" fill-opacity=".15"/>' +
      '<rect x="11" y="34.5" width="14" height="2" rx=".5" fill="#fff" fill-opacity=".18"/>' +
      '<rect x="36" y="16" width="10" height="18" rx="5" fill="#5b7a9d"/>' +
      '<line x1="41" y1="16" x2="41" y2="24" stroke="#fff" stroke-width=".8" stroke-opacity=".3"/>' +
      '<rect x="37.5" y="18" width="3" height="5" rx="1" fill="#fff" fill-opacity=".15"/>' +
      '<rect x="41.5" y="18" width="3" height="5" rx="1" fill="#fff" fill-opacity=".15"/>' +
      '<circle cx="41" cy="27" r="1" fill="#fff" fill-opacity=".25"/>',
      '#f0f7ff'
    ),
    // 气垫：打开的圆形气垫粉盒（上盖含镜面 + 下盒含气垫芯 + 铰链连接）
    '气垫': svgCustomIcon(
      '<ellipse cx="24" cy="32" rx="16" ry="9" fill="#d4a6c0"/>' +
      '<ellipse cx="24" cy="32" rx="12" ry="6.5" fill="#f0c8d8" fill-opacity=".6"/>' +
      '<circle cx="19" cy="30" r="1" fill="#fff" fill-opacity=".3"/>' +
      '<circle cx="24" cy="29.5" r="1" fill="#fff" fill-opacity=".3"/>' +
      '<circle cx="29" cy="30" r="1" fill="#fff" fill-opacity=".3"/>' +
      '<circle cx="21.5" cy="33.5" r="1" fill="#fff" fill-opacity=".3"/>' +
      '<circle cx="26.5" cy="33.5" r="1" fill="#fff" fill-opacity=".3"/>' +
      '<ellipse cx="24" cy="12" rx="14" ry="8" fill="#b89cc0"/>' +
      '<ellipse cx="24" cy="12" rx="10" ry="5.5" fill="#d4c8e0" fill-opacity=".5"/>' +
      '<ellipse cx="22" cy="10" rx="4" ry="2" fill="#fff" fill-opacity=".25"/>' +
      '<rect x="20" y="19" width="8" height="3" rx="1" fill="#c09ab0"/>',
      '#fff0f5'
    ),
    // 隔离霜：牙膏管状软管包装（管身 + 拧盖 + 标签区）
    '隔离': svgCustomIcon(
      '<rect x="16" y="14" width="16" height="26" rx="6" fill="#a8d4a8"/>' +
      '<rect x="20" y="6" width="8" height="10" rx="2" fill="#7ab87a"/>' +
      '<rect x="22" y="2" width="4" height="5" rx="1.5" fill="#5a9a5a"/>' +
      '<rect x="19" y="18" width="10" height="16" rx="1" fill="#fff" fill-opacity=".15"/>' +
      '<rect x="21" y="22" width="6" height="2" rx="1" fill="#fff" fill-opacity=".2"/>' +
      '<rect x="21" y="26" width="6" height="2" rx="1" fill="#fff" fill-opacity=".15"/>',
      '#f0fff0'
    ),
    // 粉底：玻璃按压瓶（透明瓶身 + 按压泵头 + 出液管）
    '粉底': svgCustomIcon(
      '<rect x="16" y="18" width="16" height="24" rx="3" fill="#e8c8a0"/>' +
      '<rect x="19" y="22" width="10" height="16" rx="1.5" fill="#fff" fill-opacity=".2"/>' +
      '<rect x="20" y="12" width="8" height="8" rx="1" fill="#d4b090"/>' +
      '<rect x="18" y="6" width="12" height="7" rx="2" fill="#c8a880"/>' +
      '<rect x="12" y="8" width="8" height="3" rx="1.5" fill="#b8986a"/>' +
      '<circle cx="12" cy="9.5" r="1.5" fill="#a08060"/>',
      '#fef5e7'
    ),
    // 腮红：打开的方形腮红盘（2-3个色块） + 旁边一把化妆刷
    '腮红': svgCustomIcon(
      '<rect x="4" y="16" width="26" height="24" rx="3" fill="#d4a6c0"/>' +
      '<rect x="7" y="19" width="9" height="18" rx="2" fill="#ff8fa0" fill-opacity=".7"/>' +
      '<rect x="18" y="19" width="9" height="18" rx="2" fill="#ffb8c0" fill-opacity=".6"/>' +
      '<rect x="10" y="19" width="3" height="18" rx="1" fill="#ffa0b0" fill-opacity=".5"/>' +
      '<rect x="36" y="6" width="5" height="22" rx="2.5" fill="#c09a80"/>' +
      '<ellipse cx="38.5" cy="32" rx="4" ry="6" fill="#e8c0a0"/>' +
      '<ellipse cx="38.5" cy="34" rx="3" ry="4" fill="#f0d0b8" fill-opacity=".6"/>',
      '#fff0f5'
    ),
    // 睫毛膏：圆柱管体 + 抽出的带刷毛睫毛刷（管体和刷头分离展示）
    '睫毛膏': svgCustomIcon(
      '<rect x="8" y="10" width="8" height="30" rx="4" fill="#5b4a6a"/>' +
      '<rect x="9" y="8" width="6" height="4" rx="1" fill="#4a3a5a"/>' +
      '<rect x="10" y="38" width="4" height="3" rx="1" fill="#4a3a5a"/>' +
      '<rect x="28" y="6" width="6" height="18" rx="3" fill="#5b4a6a"/>' +
      '<rect x="29.5" y="24" width="3" height="4" rx="1" fill="#7a6a8a"/>' +
      '<ellipse cx="31" cy="32" rx="2.5" ry="6" fill="#7a6a8a"/>' +
      '<line x1="28.5" y1="28" x2="33.5" y2="28" stroke="#9a8aaa" stroke-width=".8"/>' +
      '<line x1="28.5" y1="30" x2="33.5" y2="30" stroke="#9a8aaa" stroke-width=".8"/>' +
      '<line x1="28.5" y1="32" x2="33.5" y2="32" stroke="#9a8aaa" stroke-width=".8"/>' +
      '<line x1="28.5" y1="34" x2="33.5" y2="34" stroke="#9a8aaa" stroke-width=".8"/>' +
      '<line x1="28.5" y1="36" x2="33.5" y2="36" stroke="#9a8aaa" stroke-width=".8"/>',
      '#f5f0ff'
    ),
    // 扫地机器人：扁平圆盘机身（俯视） + 顶部雷达小圆 + 两侧伸出的旋转扫刷
    '扫地机器人': svgCustomIcon(
      '<circle cx="24" cy="24" r="14" fill="#5b7a9d"/>' +
      '<circle cx="24" cy="24" r="11" fill="#6a8aad" fill-opacity=".4"/>' +
      '<circle cx="24" cy="16" r="3.5" fill="#4a6a8a"/>' +
      '<circle cx="24" cy="16" r="1.8" fill="#a8d4f0" fill-opacity=".45"/>' +
      '<circle cx="24" cy="27" r="2" fill="#4cd964" fill-opacity=".45"/>' +
      '<line x1="13" y1="32" x2="6" y2="38" stroke="#7a9dbc" stroke-width="1.5" stroke-linecap="round"/>' +
      '<line x1="11" y1="30" x2="4" y2="34" stroke="#7a9dbc" stroke-width="1.5" stroke-linecap="round"/>' +
      '<line x1="12" y1="34" x2="5" y2="40" stroke="#7a9dbc" stroke-width="1.5" stroke-linecap="round"/>' +
      '<line x1="35" y1="32" x2="42" y2="38" stroke="#7a9dbc" stroke-width="1.5" stroke-linecap="round"/>' +
      '<line x1="37" y1="30" x2="44" y2="34" stroke="#7a9dbc" stroke-width="1.5" stroke-linecap="round"/>' +
      '<line x1="36" y1="34" x2="43" y2="40" stroke="#7a9dbc" stroke-width="1.5" stroke-linecap="round"/>',
      '#f0fff0'
    ),
    // 空气净化器：现代立式机器 + 顶部出风口 + 正面多排点状通风孔（非人脸）
    '空气净化器': svgCustomIcon(
      '<rect x="14" y="6" width="20" height="36" rx="4" fill="#a8d4f0"/>' +
      '<rect x="16" y="8" width="16" height="3" rx="1.5" fill="#5b7a9d"/>' +
      '<rect x="18" y="20" width="12" height="16" rx="2" fill="#fff" fill-opacity=".3"/>' +
      // 多排通风孔 (4x3 矩阵)
      '<circle cx="20" cy="23" r="1" fill="#5b7a9d"/>' +
      '<circle cx="24" cy="23" r="1" fill="#5b7a9d"/>' +
      '<circle cx="28" cy="23" r="1" fill="#5b7a9d"/>' +
      '<circle cx="20" cy="27" r="1" fill="#5b7a9d"/>' +
      '<circle cx="24" cy="27" r="1" fill="#5b7a9d"/>' +
      '<circle cx="28" cy="27" r="1" fill="#5b7a9d"/>' +
      '<circle cx="20" cy="31" r="1" fill="#5b7a9d"/>' +
      '<circle cx="24" cy="31" r="1" fill="#5b7a9d"/>' +
      '<circle cx="28" cy="31" r="1" fill="#5b7a9d"/>' +
      '<circle cx="20" cy="35" r="1" fill="#5b7a9d"/>' +
      '<circle cx="24" cy="35" r="1" fill="#5b7a9d"/>' +
      '<circle cx="28" cy="35" r="1" fill="#5b7a9d"/>' +
      '<circle cx="30" cy="14" r="1.5" fill="#4cd964"/>',
      '#f0f7ff'
    ),
    // 机器人（玩具）：带有发条旋钮的全身机械玩具
    '机器人': svgCustomIcon(
      '<rect x="14" y="20" width="20" height="18" rx="2" fill="#7a9dbc"/>' +
      '<rect x="18" y="8" width="12" height="10" rx="3" fill="#5b7a9d"/>' +
      '<circle cx="21" cy="13" r="1.5" fill="#ff6b6b"/>' +
      '<circle cx="27" cy="13" r="1.5" fill="#ff6b6b"/>' +
      '<rect x="22" y="16" width="4" height="1" fill="#fff" fill-opacity=".5"/>' +
      '<line x1="24" y1="8" x2="24" y2="4" stroke="#5b7a9d" stroke-width="2" stroke-linecap="round"/>' +
      '<circle cx="24" cy="3" r="1.5" fill="#ffcc00"/>' +
      '<rect x="16" y="24" width="16" height="8" rx="1" fill="#5b7a9d" fill-opacity=".5"/>' +
      // 发条
      '<rect x="34" y="24" width="4" height="2" rx="1" fill="#8e8e8e"/>' +
      '<circle cx="36" cy="25" r="2.5" fill="none" stroke="#8e8e8e" stroke-width="2"/>' +
      '<line x1="36" y1="21" x2="36" y2="23" stroke="#8e8e8e" stroke-width="2" stroke-linecap="round"/>' +
      // 手臂和腿
      '<rect x="10" y="22" width="4" height="10" rx="2" fill="#4a6a8a"/>' +
      '<rect x="34" y="22" width="4" height="10" rx="2" fill="#4a6a8a"/>' +
      '<rect x="18" y="38" width="4" height="6" rx="1" fill="#5b7a9d"/>' +
      '<rect x="26" y="38" width="4" height="6" rx="1" fill="#5b7a9d"/>',
      '#f0fff0'
    )
  }

  // ===== 手机品牌 Logo 匹配 =====
  if (n.includes('iphone') || n.includes('apple') || n.includes('苹果')) return svgPathIcon(paths.apple, '0 0 24 24', '#000', '#f5f5f7')
  if (n.includes('huawei') || n.includes('华为') || n.includes('mate') || n.includes('p30')) return svgPathIcon(paths.huawei, '0 0 24 24', '#e2001a', '#ffeeee')
  if (n.includes('小米') || n.includes('xiaomi') || n.includes('mix')) return svgPathIcon(paths.xiaomi, '0 0 24 24', '#ff6900', '#fff3e6')
  if (n.includes('oppo') || n.includes('reno')) return svgPathIcon(paths.oppo, '0 0 24 24', '#1a8f29', '#e8f5ec')
  if (n.includes('vivo')) return svgPathIcon(paths.vivo, '0 0 24 24', '#415fff', '#ecefff')
  if (n.includes('荣耀') || n.includes('honor')) return svgPathIcon(paths.honor, '0 0 24 24', '#0ab4e1', '#e6f7fc')
  if (n.includes('一加') || n.includes('1+')) return svgPathIcon(paths.oneplus, '0 0 24 24', '#e2001a', '#ffeeee')

  // ===== 精细矢量图标优先匹配 =====
  for (let key in customIcons) {
    if (n.includes(key)) return customIcons[key]
  }

  // ===== Emoji 图标映射（其余品类） =====
  const imgMap = {
    '以旧换新': emojiIcon('♻️', '#eafff0'),
    '手机': emojiIcon('📱', '#f0f7ff'),
    '口红': emojiIcon('💄', '#fff0f5'),
    '粉底': emojiIcon('🧴', '#fef5e7'),
    '气垫': emojiIcon('💿', '#fef5e7'),
    '隔离': emojiIcon('🧴', '#f0fff0'),
    '防晒': emojiIcon('☀️', '#fffff0'),
    '睫毛膏': emojiIcon('👁️', '#f5f0ff'),
    '腮红': emojiIcon('🌸', '#fff0f5'),
    '美白': emojiIcon('✨', '#fffff0'),
    '美妆': emojiIcon('💅', '#fff0f5'),
    '染毛': emojiIcon('💇', '#fef5e7'),
    '空气净化器': emojiIcon('🌬️', '#f0f7ff'),
    '扫地机器人': emojiIcon('🤖', '#f0fff0'),
    '厨房电器': emojiIcon('🍳', '#fef5e7'),
    '加湿器': emojiIcon('💧', '#f0f7ff'),
    '音箱': emojiIcon('🔊', '#f5f0ff'),
    '电脑': emojiIcon('💻', '#f0f7ff'),
    '平板': emojiIcon('📱', '#f0f7ff'),
    '电玩': emojiIcon('🎮', '#f5f0ff'),
    '动漫': emojiIcon('🎭', '#fef5e7'),
    '游戏': emojiIcon('🎮', '#f5f0ff'),
    '影视': emojiIcon('🎬', '#f5f0ff'),
    '单反': emojiIcon('📷', '#f0f7ff'),
    '相机': emojiIcon('📸', '#f0f7ff'),
    '无人机': emojiIcon('✈️', '#f0f7ff'),
    '键盘': emojiIcon('⌨️', '#f0f7ff'),
    '鼠标': emojiIcon('🖱️', '#f0f7ff'),
    '数码': emojiIcon('📟', '#f0f7ff'),
    '鞋': emojiIcon('👟', '#f5f0ff'),
    '装': emojiIcon('👔', '#f0f7ff'),
    '包': emojiIcon('👜', '#fef5e7'),
    '家具': emojiIcon('🛋️', '#f0fff0'),
    '家饰': emojiIcon('🏠', '#f0fff0'),
    '家纺': emojiIcon('🛏️', '#f0fff0'),
    '乐器': emojiIcon('🎸', '#fef5e7'),
    '户外': emojiIcon('⛰️', '#f0fff0'),
    '运动': emojiIcon('🏃', '#f0f7ff'),
    '宠物': emojiIcon('🐾', '#fef5e7'),
    '清洁': emojiIcon('🧽', '#f0fff0'),
    '玩具': emojiIcon('🧸', '#fef5e7'),
    '孕': emojiIcon('👶', '#fff0f5'),
    '母婴': emojiIcon('👶', '#fff0f5'),
    '工具': emojiIcon('🔧', '#f0f7ff'),
    '装修': emojiIcon('🏗️', '#fef5e7'),
    '建材': emojiIcon('🧱', '#fef5e7'),
    '配件': emojiIcon('🔗', '#f0f7ff'),
    '箱': emojiIcon('🧳', '#fef5e7'),
    '机器人': emojiIcon('🤖', '#f0fff0'),
    '沙发': emojiIcon('🛋️', '#f0fff0'),
    '跑鞋': emojiIcon('👟', '#f5f0ff'),
    '外套': emojiIcon('🧥', '#f0f7ff'),
    'lol': emojiIcon('🎮', '#f5f0ff'),
    '二手': emojiIcon('🔄', '#fef5e7'),
    '主机': emojiIcon('🖥️', '#f0f7ff'),
    '精选': emojiIcon('⭐', '#fffff0'),
    '休闲': emojiIcon('👞', '#f5f0ff')
  }
  for (let key in imgMap) {
    if (n.includes(key.toLowerCase())) return imgMap[key]
  }
  // 兜底
  return emojiIcon('🛒', '#f0f7ff')
}