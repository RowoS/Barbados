import { Button } from "@/shared/ui/button";
import { ReactNode } from "react";


export interface LoginFormProps extends React.ComponentPropsWithoutRef<"div"> {}

export interface CreateAccountFormProps extends React.ComponentPropsWithoutRef<"div"> {}

export interface SidebarHeaderProps {
  isOpen: boolean;
}

export interface SidebarToggleProps {
  isLocked: boolean;
  onToggle: () => void;
}

export interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  isActive?: boolean;
  isOpen: boolean;
  onClick?: () => void;
}

export interface MenuItemConfig {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

export interface SidebarProfileProps {
  name: string;
  avatarUrl: string;
  isOpen: boolean;
}

export interface ActionButtonProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
}

export interface DescriptionProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}

export interface Plant {
  plant_id: string;
  name: string;
  description: string | null;
  light_requirements: string | null;
  water_requirements: string | null;
  temperature_requirements: string | null;
  growth: string | null;
  created_at: string;
  image_url?: string;
  scientific_name?: string;
}

export interface Garden {
  garden_id: string;
  user_id: string;
  name: string;
  created_at: string;
}

export interface GardenPlant {
  id: string;
  garden_id: string;
  plant_id: string;
  user_id: string;
  added_at: string;
}

export interface Task {
  task_id: string;
  user_id: string;
  garden_id: string;
  plant_id: string | null;
  task_type: string;
  task_status: string;
  description: string | null;
  start_date: string;
  end_date: string;
  created_at: string;
}

export interface JournalEntry {
  journal_id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
}

export type GroupedEntries = {
  [key: string]: JournalEntry[];
};

export interface GardenWithPlants extends Garden {
  garden_plants: {
    plant: Plant;
  }[];
}

export interface GardenWithCount extends Garden {
  garden_plants: { count: number }[];
}