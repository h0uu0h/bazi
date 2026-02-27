import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { STEMS, BRANCHES, ELEMENTS } from "../constants/bazi";

// 基础配置
const CONFIG = {
    width: 600,
    height: 600,
    outerRadius: 220, // 地支圆环半径
    innerRadius: 130, // 天干圆环半径
    nodeSize: 24, // 节点圆圈半径
};

const BaziDoubleRing = () => {
    const containerRef = useRef();
    const center = { x: CONFIG.width / 2, y: CONFIG.height / 2 };

    // 辅助函数：根据索引和总数计算极坐标转换后的 XY
    const getCoords = (index, total, radius) => {
        // 减去 Math.PI / 2 是为了让第一个元素（子/甲）出现在正上方
        const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
        return {
            x: center.x + radius * Math.cos(angle),
            y: center.y + radius * Math.sin(angle),
            angle: angle, // 保留角度，方便以后做文字旋转
        };
    };

    // 入场动画
    useGSAP(
        () => {
            // 整个圆环的淡入和旋转
            gsap.from(".ring-group", {
                rotation: -30,
                opacity: 0,
                duration: 1.5,
                ease: "power3.out",
            });

            // 节点的逐个弹跳出现
            gsap.from(".node", {
                scale: 0,
                opacity: 0,
                duration: 0.8,
                stagger: {
                    each: 0.05,
                    from: "start",
                },
                ease: "back.out(1.7)",
            });
        },
        { scope: containerRef },
    );

    return (
        <div ref={containerRef} className="w-full h-screen flex items-center justify-center bg-gray-900">
            <svg width={CONFIG.width} height={CONFIG.height} viewBox={`0 0 ${CONFIG.width} ${CONFIG.height}`} className="overflow-visible">
                {/* 背景辅助环 */}
                <circle
                    cx={center.x}
                    cy={center.y}
                    r={CONFIG.outerRadius}
                    className="stroke-gray-700 fill-none"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                />
                <circle
                    cx={center.x}
                    cy={center.y}
                    r={CONFIG.innerRadius}
                    className="stroke-gray-700 fill-none"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                />

                <g className="ring-group">
                    {/* 渲染 12 地支 (外环) */}
                    {BRANCHES.map((branch, i) => {
                        const { x, y } = getCoords(i, 12, CONFIG.outerRadius);
                        const color = ELEMENTS[branch.element].color;
                        return (
                            <g
                                key={`branch-${branch.id}`}
                                className="node cursor-pointer"
                                onMouseEnter={() => gsap.to(`#text-branch-${i}`, { scale: 1.2, duration: 0.2 })}
                                onMouseLeave={() => gsap.to(`#text-branch-${i}`, { scale: 1, duration: 0.2 })}>
                                <circle cx={x} cy={y} r={CONFIG.nodeSize} fill={color} fillOpacity="0.2" className="stroke-2" stroke={color} />
                                <text
                                    id={`text-branch-${i}`}
                                    x={x}
                                    y={y}
                                    dy=".35em"
                                    textAnchor="middle"
                                    fill={color}
                                    className="text-lg font-bold select-none">
                                    {branch.name}
                                </text>
                            </g>
                        );
                    })}

                    {/* 渲染 10 天干 (内环) */}
                    {STEMS.map((stem, i) => {
                        const { x, y } = getCoords(i, 10, CONFIG.innerRadius);
                        const color = ELEMENTS[stem.element].color;
                        return (
                            <g key={`stem-${stem.id}`} className="node cursor-pointer">
                                <circle cx={x} cy={y} r={CONFIG.nodeSize - 4} fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1" />
                                <text x={x} y={y} dy=".35em" textAnchor="middle" fill={color} className="text-base font-medium select-none">
                                    {stem.name}
                                </text>
                            </g>
                        );
                    })}
                </g>
            </svg>
        </div>
    );
};

export default BaziDoubleRing;
