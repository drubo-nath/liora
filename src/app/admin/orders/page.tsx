import { desc, inArray } from "drizzle-orm";
import { db, schema } from "@/db";
import { formatBDT } from "@/lib/format";
import { formatPhone } from "@/lib/phone";
import { updateOrderStatus } from "@/lib/actions/admin";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const dynamic = "force-dynamic";

const STATUSES = ["pending", "confirmed", "fulfilled", "cancelled"] as const;

export default async function AdminOrders() {
  const orders = await db
    .select()
    .from(schema.orders)
    .orderBy(desc(schema.orders.createdAt))
    .limit(100);

  const items = orders.length
    ? await db
        .select()
        .from(schema.orderItems)
        .where(inArray(schema.orderItems.orderId, orders.map((o) => o.id)))
    : [];
  const byOrder = new Map<number, typeof items>();
  for (const it of items) {
    const list = byOrder.get(it.orderId) ?? [];
    list.push(it);
    byOrder.set(it.orderId, list);
  }

  async function setStatus(fd: FormData) {
    "use server";
    await updateOrderStatus(
      Number(fd.get("orderId")),
      fd.get("status") as (typeof STATUSES)[number],
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>

      <div className="mt-6 space-y-4">
        {orders.map((o) => (
          <Card key={o.id}>
            <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2 space-y-0">
              <CardTitle className="flex flex-wrap items-center gap-x-4 gap-y-1 text-base">
                <span>{o.orderNumber}</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {formatPhone(o.phone)}
                </span>
                <span className="text-sm font-normal text-muted-foreground">
                  {formatBDT(o.total)}
                </span>
              </CardTitle>
              <Badge
                variant={
                  o.status === "fulfilled"
                    ? "default"
                    : o.status === "cancelled"
                      ? "destructive"
                      : "secondary"
                }
              >
                {o.status}
              </Badge>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div className="text-sm">
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Delivery
                </p>
                <p className="mt-2">
                  {o.customerName} · {formatPhone(o.phone)}
                  {o.email && (
                    <span className="block text-xs text-muted-foreground">
                      {o.email}
                    </span>
                  )}
                  <span className="mt-1 block">
                    {o.addressLine}, {o.city} {o.postalCode ?? ""}
                  </span>
                </p>
                <p className="mt-3 text-xs capitalize text-muted-foreground">
                  Payment: {o.paymentMethod}
                </p>
              </div>
              <div className="text-sm">
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Items
                </p>
                <ul className="mt-2 space-y-1">
                  {(byOrder.get(o.id) ?? []).map((it) => (
                    <li key={it.id} className="flex justify-between gap-4">
                      <span>
                        {it.productName}{" "}
                        <span className="text-xs text-muted-foreground">
                          · {it.finish} · {it.size} × {it.qty}
                        </span>
                      </span>
                      <span>{formatBDT(it.lineTotal)}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 flex justify-between text-xs text-muted-foreground">
                  <span>Subtotal {formatBDT(o.subtotal)}</span>
                  <span>
                    Delivery{" "}
                    {o.shippingFee === 0 ? "Free" : formatBDT(o.shippingFee)}
                  </span>
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <form
                action={setStatus}
                className="flex w-full flex-wrap items-center gap-3 border-t pt-4"
              >
                <input type="hidden" name="orderId" value={o.id} />
                <Select name="status" defaultValue={o.status}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button type="submit" size="sm">
                  Update status
                </Button>
              </form>
            </CardFooter>
          </Card>
        ))}
        {orders.length === 0 && (
          <p className="py-12 text-center text-sm text-muted-foreground">
            No orders yet.
          </p>
        )}
      </div>
      <Separator className="mt-8" />
    </div>
  );
}
