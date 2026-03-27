import { createElement } from "react";
import {
  Sparkles,
  Shield,
  BarChart3,
  ShieldAlert,
  SatelliteDish,
  LineChart,
  CircuitBoard,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  shield: Shield,
  "bar-chart-3": BarChart3,
  "shield-alert": ShieldAlert,
  "satellite-dish": SatelliteDish,
  "line-chart": LineChart,
  "circuit-board": CircuitBoard,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Sparkles;
}

export function renderIcon(name: string, className?: string) {
  const Icon = getIcon(name);
  return createElement(Icon, { className });
}
