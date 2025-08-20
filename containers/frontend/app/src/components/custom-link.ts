// app/root.tsx
import { DropdownItem, Link as HeroUILink } from "@heroui/react";
import { createLink } from "@tanstack/react-router";

export const CustomLink = createLink(HeroUILink);
export const CustomDropdownItemLink = createLink(DropdownItem);
