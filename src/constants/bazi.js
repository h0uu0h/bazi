/**
 * 八字核心常量定义
 * 包含：五行、天干、地支、藏干、各种合冲关系
 */

// 1. 五行定义
export const ELEMENTS = {
    WOOD: { id: 0, name: '木', color: '#4CAF50', generates: 'FIRE', overcomes: 'EARTH' },
    FIRE: { id: 1, name: '火', color: '#FF5722', generates: 'EARTH', overcomes: 'METAL' },
    EARTH: { id: 2, name: '土', color: '#8D6E63', generates: 'METAL', overcomes: 'WATER' },
    METAL: { id: 3, name: '金', color: '#FFD700', generates: 'WATER', overcomes: 'WOOD' },
    WATER: { id: 4, name: '水', color: '#2196F3', generates: 'WOOD', overcomes: 'FIRE' },
};

// 2. 十天干
export const STEMS = [
    { id: 0, name: '甲', element: 'WOOD', yinYang: 'YANG' },
    { id: 1, name: '乙', element: 'WOOD', yinYang: 'YIN' },
    { id: 2, name: '丙', element: 'FIRE', yinYang: 'YANG' },
    { id: 3, name: '丁', element: 'FIRE', yinYang: 'YIN' },
    { id: 4, name: '戊', element: 'EARTH', yinYang: 'YANG' },
    { id: 5, name: '己', element: 'EARTH', yinYang: 'YIN' },
    { id: 6, name: '庚', element: 'METAL', yinYang: 'YANG' },
    { id: 7, name: '辛', element: 'METAL', yinYang: 'YIN' },
    { id: 8, name: '壬', element: 'WATER', yinYang: 'YANG' },
    { id: 9, name: '癸', element: 'WATER', yinYang: 'YIN' },
];

// 3. 十二地支 (带藏干比例：本气 0.6, 中气 0.3, 余气 0.1)
export const BRANCHES = [
    { id: 0, name: '子', element: 'WATER', yinYang: 'YANG', hidden: [{ name: '癸', weight: 1.0 }] },
    { id: 1, name: '丑', element: 'EARTH', yinYang: 'YIN', hidden: [{ name: '己', weight: 0.6 }, { name: '癸', weight: 0.3 }, { name: '辛', weight: 0.1 }] },
    { id: 2, name: '寅', element: 'WOOD', yinYang: 'YANG', hidden: [{ name: '甲', weight: 0.6 }, { name: '丙', weight: 0.3 }, { name: '戊', weight: 0.1 }] },
    { id: 3, name: '卯', element: 'WOOD', yinYang: 'YIN', hidden: [{ name: '乙', weight: 1.0 }] },
    { id: 4, name: '辰', element: 'EARTH', yinYang: 'YANG', hidden: [{ name: '戊', weight: 0.6 }, { name: '乙', weight: 0.3 }, { name: '癸', weight: 0.1 }] },
    { id: 5, name: '巳', element: 'FIRE', yinYang: 'YIN', hidden: [{ name: '丙', weight: 0.6 }, { name: '庚', weight: 0.3 }, { name: '戊', weight: 0.1 }] },
    { id: 6, name: '午', element: 'FIRE', yinYang: 'YANG', hidden: [{ name: '丁', weight: 0.7 }, { name: '己', weight: 0.3 }] },
    { id: 7, name: '未', element: 'EARTH', yinYang: 'YIN', hidden: [{ name: '己', weight: 0.6 }, { name: '丁', weight: 0.3 }, { name: '乙', weight: 0.1 }] },
    { id: 8, name: '申', element: 'METAL', yinYang: 'YANG', hidden: [{ name: '庚', weight: 0.6 }, { name: '壬', weight: 0.3 }, { name: '戊', weight: 0.1 }] },
    { id: 9, name: '酉', element: 'METAL', yinYang: 'YIN', hidden: [{ name: '辛', weight: 1.0 }] },
    { id: 10, name: '戌', element: 'EARTH', yinYang: 'YANG', hidden: [{ name: '戊', weight: 0.6 }, { name: '辛', weight: 0.3 }, { name: '丁', weight: 0.1 }] },
    { id: 11, name: '亥', element: 'WATER', yinYang: 'YIN', hidden: [{ name: '壬', weight: 0.7 }, { name: '甲', weight: 0.3 }] },
];

// 4. 天干五合 (化气关系)
export const STEM_COMBINATIONS = {
    '甲': { partner: '己', result: 'EARTH', description: '中正之合' },
    '乙': { partner: '庚', result: 'METAL', description: '仁义之合' },
    '丙': { partner: '辛', result: 'WATER', description: '威制之合' },
    '丁': { partner: '壬', result: 'WOOD', description: '淫慝之合' },
    '戊': { partner: '癸', result: 'FIRE', description: '无情之合' },
};

// 5. 地支六合 (ID 映射)
export const BRANCH_SIX_COMBINES = {
    0: 1,  // 子丑
    11: 2, // 亥寅
    10: 3, // 戌卯
    9: 4,  // 酉辰
    8: 5,  // 申巳
    7: 6,  // 未午
};

// 6. 地支三合局 (按五行结果归类)
export const BRANCH_TRIPLE_COMBINES = [
    { elements: [2, 6, 10], result: 'FIRE', name: '寅午戌' },
    { elements: [10, 2, 6], result: 'FIRE', name: '寅午戌' }, // 为了检索方便，通常会在逻辑层处理排序
    { elements: [11, 3, 7], result: 'WOOD', name: '亥卯未' },
    { elements: [7, 11, 3], result: 'WOOD', name: '亥卯未' },
    { elements: [8, 0, 4], result: 'WATER', name: '申子辰' },
    { elements: [4, 8, 0], result: 'WATER', name: '申子辰' },
    { elements: [5, 9, 1], result: 'METAL', name: '巳酉丑' },
    { elements: [1, 5, 9], result: 'METAL', name: '巳酉丑' },
];

// 7. 十二生旺库状态名
export const LIFE_STAGES = [
    '长生', '沐浴', '冠带', '临官', '帝旺', '衰', '病', '死', '墓', '绝', '胎', '养'
];

// 8. 十二生旺库矩阵 (行：十天干 STEMS[0-9], 列：十二地支 BRANCHES[0-11])
// 逻辑：以甲木(0)在亥(11)为长生开始顺推，阴干逆推
export const LIFE_STAGE_MATRIX = [
    //子, 丑, 寅, 卯, 辰, 巳, 午, 未, 申, 酉, 戌, 亥
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0],  // 0 甲 (木)
    [6, 5, 4, 3, 2, 1, 0, 11, 10, 9, 8, 7],  // 1 乙 (木)
    [10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],  // 2 丙 (火)
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 11, 10], // 3 丁 (火)
    [10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],  // 4 戊 (土) - 随火
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 11, 10], // 5 己 (土) - 随火
    [7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6],  // 6 庚 (金)
    [0, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],  // 7 辛 (金)
    [4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3],  // 8 壬 (水)
    [3, 2, 1, 0, 11, 10, 9, 8, 7, 6, 5, 4],  // 9 癸 (水)
];
/**
 * 辅助函数：快速获取某个干支的状态名称
 * @param {number} stemId 天干索引
 * @param {number} branchId 地支索引
 * @returns {string} 状态名称 (如 "帝旺")
 */
export const getLifeStageName = (stemId, branchId) => {
    const stageIndex = LIFE_STAGE_MATRIX[stemId][branchId];
    return LIFE_STAGES[stageIndex];
};