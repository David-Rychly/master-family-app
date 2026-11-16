"use client";

import type { ReactNode } from "react";
import { CalendarDays, House, Plus } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { Card, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Checkbox } from "@repo/ui/components/checkbox";
import { EmptyState } from "@repo/ui/components/empty-state";
import { ErrorState } from "@repo/ui/components/error-state";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select";
import { SkeletonCard, SkeletonRows } from "@repo/ui/components/skeleton";
import { Switch } from "@repo/ui/components/switch";
import { Tabs, TabsList, TabsTrigger } from "@repo/ui/components/tabs";
import { Textarea } from "@repo/ui/components/textarea";
import { ChoresCard, ShoppingCard, TodayCard } from "@/components/dashboard/cards";

const noop = () => {};

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="type-h2">{title}</h2>
      {children}
    </section>
  );
}

export function StatesGallery() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-2">
        <span className="type-label text-subtle">Development only</span>
        <h1 className="type-h1">States and forms</h1>
      </div>

      <Section title="Empty: inside a card">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
          <TodayCard today={[]} tomorrow={[]} />
          <ShoppingCard shopping={{ count: 0, lastChange: "Mom bought the last item 2 h ago", preview: [] }} />
          <ChoresCard
            chores={{
              done: 20,
              total: 20,
              people: [
                { name: "Ella", done: 5, total: 5 },
                { name: "Leo", done: 5, total: 5 },
              ],
            }}
          />
        </div>
      </Section>

      <Section title="Empty: whole page">
        <EmptyState
          size="page"
          icon={<CalendarDays />}
          title="No events yet"
          description="Add birthdays, appointments and activities so everyone knows what is coming up."
          action={
            <Button>
              <Plus />
              Add event
            </Button>
          }
        />
      </Section>

      <Section title="Loading">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
          <SkeletonCard rows={4} />
          <SkeletonCard rows={2} />
          <Card>
            <CardHeader>
              <CardTitle>Members</CardTitle>
            </CardHeader>
            <SkeletonRows rows={3} />
          </Card>
        </div>
      </Section>

      <Section title="Error: one card">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Chores this week</CardTitle>
            </CardHeader>
            <ErrorState title="Couldn't load chores" onRetry={noop} />
          </Card>
        </div>
      </Section>

      <Section title="Error: whole page">
        <ErrorState
          size="page"
          title="This page didn't load"
          description="Something went wrong on our side or with the connection. Try again, or go back to the dashboard."
          onRetry={noop}
          secondaryAction={
            <Button variant="ghost">
              <House />
              Back to home
            </Button>
          }
        />
      </Section>

      <Section title="Form components">
        <Card className="max-w-xl">
          <div className="flex flex-col gap-2">
            <Label htmlFor="item">Item</Label>
            <Input id="item" placeholder="Milk, bread, apples…" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="item-error">Item</Label>
            <Input id="item-error" aria-invalid aria-describedby="item-error-msg" defaultValue="" />
            <p id="item-error-msg" className="type-small text-destructive">
              Add a name for the item.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="who">Who buys it</Label>
            <Select defaultValue="anyone">
              <SelectTrigger id="who" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="anyone">Anyone</SelectItem>
                <SelectItem value="mom">Mom</SelectItem>
                <SelectItem value="dad">Dad</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="note">Note</Label>
            <Textarea id="note" placeholder="The big pack, not the small one" />
          </div>
          <div className="flex items-center gap-3">
            <Checkbox id="urgent" defaultChecked />
            <Label htmlFor="urgent">Needed today</Label>
          </div>
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="notify">Tell everyone when it is bought</Label>
            <Switch id="notify" defaultChecked />
          </div>
          <Tabs defaultValue="list">
            <TabsList>
              <TabsTrigger value="list">List</TabsTrigger>
              <TabsTrigger value="bought">Bought</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex gap-3">
            <Button>Add item</Button>
            <Button variant="ghost">Cancel</Button>
          </div>
        </Card>
      </Section>
    </div>
  );
}
