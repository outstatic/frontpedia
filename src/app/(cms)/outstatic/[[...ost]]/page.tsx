import "outstatic/outstatic.css";
import { Outstatic } from "outstatic";
import { OstClient } from "outstatic/client";

type OutstaticPageProps = {
  params: Promise<{
    ost?: string[];
  }>;
};

export default async function OutstaticPage({ params }: OutstaticPageProps) {
  const { ost } = await params;
  const ostData = await Outstatic();

  return <OstClient ostData={ostData} params={{ ost: ost ?? [] }} />;
}
