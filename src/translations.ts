/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const TRANSLATIONS = {
  en: {
    app_title: "Life OS",
    app_subtitle: "Diet Execution Agent",
    session_id: "Evening Reflection // Session ID: 294-B",
    utc: "UTC",
    agent_connected: "Agent Connected",
    mode_strict: "Strict Mode",
    mode_loose: "Loose Mode",
    
    // Tabs
    tab_log: "Today's Daily Log",
    tab_profile: "Profile & Exchange Plan",

    // Left Panel Log
    log_title: "Daily Execution Log",
    log_subtitle: "Meal & Biometric Recording",
    preset_title: "Rule Trigger Templates (Diagnostic Presets)",
    preset_sugar: "Rule A: Blood Sugar Crash",
    preset_sugar_sub: "Soft bread & premium gelato, sluggish crashes",
    preset_cortisol: "Rule B: Cortisol Fatigue",
    preset_cortisol_sub: "Emotional craving, low calories, anxious mood",
    preset_micro: "Rule C: Micronutrient Gap",
    preset_micro_sub: "Cramps & poor sleep, no vegetables logged",
    preset_boundary: "Negative Boundary Rule",
    preset_boundary_sub: "Massive ice cream logs, oil drops negative",
    
    strict_notice: "Strict Mode Enabled: Baseline servings are directly adjusted. Food description is logged for contextual tracking but values are locked to exact deductions.",
    loose_notice: "Loose Mode Enabled: Food logs will be automatically deconstructed by the agent. Bakery, pastries, and ice creams will incur standard exchange penalties.",
    
    logged_meals: "Logged Meals",
    meal_num: "Meal",
    what_did_you_eat: "What did you eat?",
    placeholder_loose: "e.g., Soft Bread 35g, Croissant, premium gelato 100g...",
    placeholder_strict: "e.g., Chicken breast, salad, oats...",
    pre_meal_feel: "Pre-Meal feeling",
    post_meal_feel: "Post-Meal feeling",
    
    // Preset feelings options
    routine: "Routine Hunger",
    extreme_hunger: "Extreme / Ravaging Hunger",
    emotional_craving: "Emotional Craving / Stress eating",
    satisfied_energetic: "Satisfied & Energetic",
    sluggish_somnolent: "Sluggish & Somnolent (Crash)",
    sugar_craving: "Sugar / Carb Cravings",
    bloated: "Bloated / Overfull",

    // End of day
    end_of_day_title: "End of Day State",
    energy_level_label: "Energy Level (1 - 10)",
    daily_mood: "Daily Mood",
    physiological_signals: "Physiological Signals",

    // Moods
    peaceful: "Peaceful",
    anxious: "Anxious",
    irritable: "Irritable",
    low: "Low",

    // Body Signals
    muscle_cramps: "Muscle Cramps",
    poor_sleep: "Poor Sleep",
    acne: "Acne Flareups",
    mild_hunger_signal: "Mild Hunger Signals",
    bloating_indigestion: "Bloating / Indigestion",
    muscle_soreness: "Muscle Soreness",
    fatigue: "Extreme Fatigue",

    // Left Panel Profile
    profile_title: "Health Profile & Exchange Plan",
    profile_subtitle: "Life OS Baseline Calibration",
    calorie_goal: "Calorie Goal (kcal)",
    exchange_sum: "Exchange-Based Sum",
    balanced_target: "✓ Balanced with target",
    calorie_dev: "kcal dev from target",
    baseline_allocation: "Baseline Food Servings Allocation",
    
    // Servings
    vegetables: "Vegetables",
    fruits: "Fruits",
    low_fat_milk: "Low-Fat Milk",
    whole_grains: "Whole Grains",
    meat: "Meat / Protein",
    pure_oil: "Pure Oil",

    health_tags_title: "Health & Behavioral Tags",
    no_tags: "No tags selected. Add some below.",
    add_custom_tag: "Add custom health tag...",
    common_presets: "Common Presets",

    // Tags presets
    tag_insulin: "Insulin Resistant",
    tag_stress: "High Stress",
    tag_runner: "Active Runner",
    tag_sedentary: "Sedentary",
    tag_owl: "Night Owl",
    tag_gain: "Muscle Gain Intent",
    tag_athletic: "Athletic",
    tag_hypo: "Hypothyroid",

    // Analysis dispatch
    analysis_dispatch: "Analysis Dispatch",
    dispatch_sub: "Submits your profile parameters and meal logs directly to the digital nutritionist agent.",
    generate_reflection_btn: "Generate Evening Reflection",
    generating_btn: "Deconstructing & Correlating...",

    // Archive section
    report_archives: "Report Archives",
    track_multi_day: "Track multi-day behavior and metrics",
    logs_saved: "Logs Saved",
    delete_log_title: "Delete log",
    no_archives: "No evening reflections archived yet.",
    no_archives_sub: "Complete today's log and click \"Generate Evening Reflection\".",

    // Empty state
    empty_title: "Reflection Buffer Empty",
    empty_sub: "Complete your calorie plans, logs, and biometric feelings in the left panel, then tap \"Generate Evening Reflection\" to activate the nutrition deconstruction engine.",

    // Reference protocol
    ref_title: "Agent Reference Protocol",
    ref_subtitle: "System rules & deconstruction maps",
    ref_loose_decon: "Loose Mode Deconstruction",
    ref_bakery_title: "Bakery & Bread (per 35g)",
    ref_bakery_hard: "Hard Bread:",
    ref_bakery_hard_val: "-1 Whole Grain",
    ref_bakery_soft: "Soft Bread:",
    ref_bakery_soft_val: "-1 Whole Grain, -0.5 Pure Oil",
    ref_bakery_pastry: "Pastry/Fruit:",
    ref_bakery_pastry_val: "-1.5 Whole Grain, -0.5 Fruit, -1.5 Pure Oil",
    ref_ice_title: "Ice Cream (per 80-100g)",
    ref_ice_premium: "Premium/Gelato:",
    ref_ice_premium_val: "-1.5 Grain/Fruit, -1 Low-Fat Milk, -2.5 Pure Oil",
    ref_ice_pops: "Fruit Popsicle:",
    ref_ice_pops_val: "-1.5 Fruit",
    ref_ice_lowcal: "Low-Cal High-Protein:",
    ref_ice_lowcal_val: "-0.5 Grain, -1 Low-Fat Meat, -0.5 Pure Oil",

    ref_boundary_title: "Negative Boundary Rule",
    ref_boundary_desc: "If any macro allowance drops below zero (e.g., Pure Oil budget is exhausted), the agent NEVER deducts it from Meat/Protein to protect lean mass. An alert is immediately generated and standard feedback is preserved.",
    
    ref_cognitive_title: "Cognitive Diagnostics",
    ref_rule_a: "Rule A: Blood Sugar",
    ref_rule_a_desc: "Consecutive sluggish / cravings post-meal triggers a crash diagnosis. Swaps tomorrow's grains for Chromium-rich foods.",
    ref_rule_b: "Rule B: Cortisol & Deficit",
    ref_rule_b_desc: "Emotional craving + anxious/irritable under high calorie deficit triggers cortisol stress protocol. Cushions calorie gap & repositions Fruit to 3 PM.",
    ref_rule_c: "Rule C: Micronutrients",
    ref_rule_c_desc: "Presence of muscle cramps / poor sleep cross-checks Fruit & Veg intake. Recommends Magnesium/Potassium foods first.",

    // Report section
    safety_alert: "Critical Safety Alert: Macro Boundary Triggered",
    safety_note: "Note: Meat allocation locked. Muscle protection protocols are currently Active.",
    behavior_reflection: "Life OS Behavioral Reflection",
    digital_nutrition_report: "Digital Nutritionist Evening Report",
    daily_balance_sheet: "Daily Balance Sheet",
    planned_energy: "Planned Energy Base",
    estimated_actual: "Estimated Actual Consumed",
    macro_deviations: "Macro Deviations",
    carbs: "Carbs",
    protein: "Protein",
    fat: "Fat",
    carryover_servings: "Carryover Servings Profile",
    physiological_analytics: "Physiological Analytics",
    glucose_stability: "Glucose Stability Curve",
    stress_cortisol: "Stress & Cortisol Diagnostics",
    micronutrient_gap: "Micronutrient Gaps Detected",
    no_gap_flagged: "No urgent micronutrient gaps flagged.",
    tomorrow_plan: "Tomorrow's Adaptive Plan (Prescription)",
    calorie_deficit: "Calorie Deficit",
    relative_deficit_calib: "Relative deficit gap calibration",
    timing_opt: "Timing Optimization",
    cooking_mode: "Cooking Mode",
    mandatory_food_swaps: "Mandatory Food Swaps",
    no_food_swaps: "No specific food swaps prescribed for tomorrow.",

    // Loading workspace
    reflecting_today: "Reflecting on Today's Cycles...",
    agent_thinking: "Generative Nutrition Agent is thinking",
    thinking_time: "Takes around 5-10 seconds to generate a full system-thinking report.",

    // Realtime Board, Check-ins and Replacements
    board_title: "Real-time Nutrition Dashboard",
    board_subtitle: "Instantly deconstructed Carb, Protein, Fat, Calories based on current logs",
    board_calories: "Calories",
    board_carbs: "Carbs",
    board_protein: "Protein",
    board_fat: "Fat",
    board_target: "Target",
    board_actual: "Actual",
    board_status: "Status",
    strict_checkin_title: "Strict Mode: Meal Check-in (打卡)",
    strict_checkin_desc: "Mark the planned meals you consumed strictly following the portion size.",
    strict_checked: "Checked",
    strict_unchecked: "Mark Consumed",
    loose_swap_title: "Loose Mode: Intelligent Replacements (智能替换)",
    loose_swap_desc: "Replace non-compliant items with recommended options to restore nutrition balance.",
    loose_swap_btn: "Apply Quick Swap",
    loose_no_swaps: "No replacement triggers found in current logs. Good job!",
    deconstruct_result: "Agent Real-time Deconstruction",
    swap_success_toast: "Successfully swapped with healthy alternative!",
  },
  zh: {
    app_title: "Life OS",
    app_subtitle: "饮食执行智能体",
    session_id: "晚间全面反思报告 // 会话 ID: 294-B",
    utc: "UTC时间",
    agent_connected: "智能体已连接",
    mode_strict: "严格模式",
    mode_loose: "松散模式",
    
    // Tabs
    tab_log: "今日饮食日志",
    tab_profile: "画像与每餐计划",

    // Left Panel Log
    log_title: "每日饮食日志",
    log_subtitle: "膳食与生物特征记录",
    preset_title: "规则触发模板 (诊断预设场景)",
    preset_sugar: "规则 A: 血糖暴跌",
    preset_sugar_sub: "软面包与高端意式冰淇淋，导致餐后昏睡",
    preset_cortisol: "规则 B: 皮质醇疲劳",
    preset_cortisol_sub: "压力与情绪性进食、超低能量、焦虑易怒",
    preset_micro: "规则 C: 微量元素缺口",
    preset_micro_sub: "抽筋和睡眠质量差，全天未摄入蔬菜",
    preset_boundary: "负向边界安全规则",
    preset_boundary_sub: "摄入大量冰淇淋，油脂预算变为负值",
    
    strict_notice: "严格模式已启用：直接调整基础份量。记录食物描述以进行背景追踪，但摄入数值被锁定为精确扣减。",
    loose_notice: "松散模式已启用：食物日志将由智能体自动拆解。烘焙食品、糕点和冰淇淋将产生标准的分数扣减惩罚。",
    
    logged_meals: "已记录膳食",
    meal_num: "膳食",
    what_did_you_eat: "你吃了什么？",
    placeholder_loose: "例如：软面包35g，牛角面包，高端意式冰淇淋100g...",
    placeholder_strict: "例如：鸡胸肉，沙拉，燕麦粥...",
    pre_meal_feel: "餐前状态/饥饿感",
    post_meal_feel: "餐后身体状态",
    
    // Preset feelings options
    routine: "常规饥饿感",
    extreme_hunger: "极度饥饿 / 饥肠辘辘",
    emotional_craving: "情绪性食欲 / 压力性进食",
    satisfied_energetic: "满足且充满活力",
    sluggish_somnolent: "餐后昏睡 / 无精打采 (血糖跌落)",
    sugar_craving: "甜食 / 碳水化合物渴望",
    bloated: "饱胀 / 消化不良",

    // End of day
    end_of_day_title: "全天结束状态",
    energy_level_label: "精力水平 (1 - 10)",
    daily_mood: "每日主要情绪",
    physiological_signals: "生理与身体信号",

    // Moods
    peaceful: "平静",
    anxious: "焦虑",
    irritable: "易怒",
    low: "低落",

    // Body Signals
    muscle_cramps: "肌肉抽筋",
    poor_sleep: "睡眠质量差",
    acne: "痘痘爆发",
    mild_hunger_signal: "轻微饥饿感",
    bloating_indigestion: "胀气 / 消化不良",
    muscle_soreness: "肌肉酸痛",
    fatigue: "极度疲劳",

    // Left Panel Profile
    profile_title: "健康画像与食物交换份计划",
    profile_subtitle: "Life OS 基准校准",
    calorie_goal: "每日卡路里目标 (kcal)",
    exchange_sum: "基于交换份的总卡路里",
    balanced_target: "✓ 与目标卡路里平衡",
    calorie_dev: "kcal 偏离每日目标",
    baseline_allocation: "基准食物交换份每日分配",
    
    // Servings
    vegetables: "蔬菜",
    fruits: "水果",
    low_fat_milk: "低脂牛奶",
    whole_grains: "全谷物",
    meat: "肉类 / 蛋白质",
    pure_oil: "纯油脂",

    health_tags_title: "健康与行为标签",
    no_tags: "未选择标签。在下方添加。",
    add_custom_tag: "添加自定义健康标签...",
    common_presets: "常见预设画像",

    // Tags presets
    tag_insulin: "胰岛素抵抗",
    tag_stress: "高压力状态",
    tag_runner: "活跃跑者",
    tag_sedentary: "久坐不动",
    tag_owl: "夜猫子一族",
    tag_gain: "增肌意向",
    tag_athletic: "专业运动型",
    tag_hypo: "甲状腺功能减退",

    // Analysis dispatch
    analysis_dispatch: "数据分析调度",
    dispatch_sub: "将您的个人健康画像和今日饮食日志提交给生成式数字营养师进行深度反思分析。",
    generate_reflection_btn: "生成晚间反思报告",
    generating_btn: "正在拆解与关联分析...",

    // Archive section
    report_archives: "全面反思历史报告存档",
    track_multi_day: "追踪多日行为与各项指标趋势",
    logs_saved: "份已保存日志",
    delete_log_title: "删除该日志",
    no_archives: "尚无存档的晚间反思报告。",
    no_archives_sub: "完成今天的饮食记录并点击“生成晚间反思报告”。",

    // Empty state
    empty_title: "反思报告缓冲区为空",
    empty_sub: "请在左侧面板中完善您的卡路里计划、饮食日志和生物特征感受，然后点击“生成晚间反思报告”以激活营养学拆解引擎。",

    // Reference protocol
    ref_title: "智能体参照协议手册",
    ref_subtitle: "系统规则与食物拆解映射图",
    ref_loose_decon: "松散模式下的食物拆解映射",
    ref_bakery_title: "烘焙点心与面包 (每 35g 换算)",
    ref_bakery_hard: "硬面包 (如法棍/贝果 35g):",
    ref_bakery_hard_val: "扣减 1 份全谷物",
    ref_bakery_soft: "软面包 (如白吐司/布里欧 35g):",
    ref_bakery_soft_val: "扣减 1 份全谷物，扣减 0.5 份纯油脂",
    ref_bakery_pastry: "起酥/果干点心 (如牛角包/红豆包):",
    ref_bakery_pastry_val: "扣减 1.5 份全谷物，扣减 0.5 份水果，扣减 1.5 份纯油脂",
    ref_ice_title: "冰淇淋与雪糕 (每 80-100g 换算)",
    ref_ice_premium: "高端冰淇淋 / 意式 Gelato:",
    ref_ice_premium_val: "扣减 1.5 份全谷物/水果，扣减 1 份低脂牛奶，扣减 2.5 份纯油脂",
    ref_ice_pops: "水果棒冰:",
    ref_ice_pops_val: "扣减 1.5 份水果",
    ref_ice_lowcal: "低卡 / 高蛋白冰淇淋:",
    ref_ice_lowcal_val: "扣减 0.5 份全谷物，扣减 1 份低脂瘦肉，扣减 0.5 份纯油脂",

    ref_boundary_title: "负向边界安全规则 (肌肉保护)",
    ref_boundary_desc: "若任意宏量营养素预算降至零以下（例如纯油脂预算耗尽），智能体绝不扣减肉类/蛋白质配额，以保护精益肌肉量免受损耗。系统将立即生成并触发安全警报，同时保留常规营养反馈。",
    
    ref_cognitive_title: "深度认知层诊断规则",
    ref_rule_a: "规则 A: 血糖稳定性特征",
    ref_rule_a_desc: "连续出现餐后昏睡或糖分渴望会触发血糖暴跌诊断。明日全谷物将替换为富含铬元素的稳定碳水（燕麦、荞麦、西兰花牛肉）。",
    ref_rule_b: "规则 B: 皮质醇与亏空能量差",
    ref_rule_b_desc: "在高卡路里亏空下，情绪性饥饿结合焦虑/易怒情绪会触发皮质醇压力协议。明日将微调卡路里缺口（适当添加部分额度），并将水果挪至下午3点加餐以缓解压力。",
    ref_rule_c: "规则 C: 微量元素缺口检测",
    ref_rule_c_desc: "出现肌肉抽筋或睡眠质量差时，系统将交叉比对今日蔬菜和水果摄入量，并在明日处方中优先推荐富含镁/钾的食物（菠菜、甜菜、香蕉、牛油果等）。",

    // Report section
    safety_alert: "关键安全警报：已触发宏量营养素安全边界保护",
    safety_note: "提示：肉类分配已被锁定，肌肉保护协议当前处于激活状态，确保蛋白质充足。",
    behavior_reflection: "Life OS 行为反思分析",
    digital_nutrition_report: "数字营养师晚间全面反馈报告",
    daily_balance_sheet: "今日摄入收支表",
    planned_energy: "计划能量基准",
    estimated_actual: "估算实际摄入能量",
    macro_deviations: "宏量营养素偏离偏差",
    carbs: "碳水化合物",
    protein: "蛋白质",
    fat: "脂肪",
    carryover_servings: "结转滚存交换份明细",
    physiological_analytics: "生理指标深度解析",
    glucose_stability: "血糖稳定性特征",
    stress_cortisol: "压力与皮质醇深度诊断",
    micronutrient_gap: "检测到的微量元素缺口",
    no_gap_flagged: "未检测到紧急的微量元素缺口。",
    tomorrow_plan: "明日自适应处方计划 (Prescription)",
    calorie_deficit: "卡路里亏空差值",
    relative_deficit_calib: "相对赤字差额校准",
    timing_opt: "进食时段优化方案",
    cooking_mode: "烹饪模式建议",
    mandatory_food_swaps: "强制食物替换建议",
    no_food_swaps: "明日无需特殊的食物替换。",

    // Loading workspace
    reflecting_today: "正在反思今天的饮食循环...",
    agent_thinking: "生成式营养学智能体正在深度思考",
    thinking_time: "生成一份完整的系统性反思报告大约需要 5-10 秒。",

    // Realtime Board, Check-ins and Replacements
    board_title: "今日营养配额实时看板",
    board_subtitle: "根据当前记录实时拆解的热量及碳蛋脂实际消耗与目标偏差",
    board_calories: "卡路里",
    board_carbs: "碳水",
    board_protein: "蛋白质",
    board_fat: "脂肪",
    board_target: "目标配额",
    board_actual: "实际消耗",
    board_status: "状态",
    strict_checkin_title: "严格模式：餐食打卡",
    strict_checkin_desc: "已严格按照配额执行，点击打卡确认：",
    strict_checked: "已打卡",
    strict_unchecked: "去打卡",
    loose_swap_title: "松散模式：智能食物替换",
    loose_swap_desc: "智能检测到非健康/超标食物，可一键替换为健康配餐：",
    loose_swap_btn: "一键替换",
    loose_no_swaps: "当前日志未检测到需要替换的精制糖或起酥高油食物，表现完美！",
    deconstruct_result: "智能体实时拆解",
    swap_success_toast: "已成功替换为健康配餐！",
  }
};
