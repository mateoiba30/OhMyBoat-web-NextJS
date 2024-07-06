"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { TradeDateSchema } from "@/schemas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { setTradeDate } from "../../../../../actions/tradeActions";
import { toast } from "sonner";
import { BadgeCheck, Check, CheckCircle } from "lucide-react";
export function SetDateComponent({alreadySetted,userId,tradeId,trade}) {
    const router = useRouter();
    const handleBack = () => {
        router.back();
    }
    const form = useForm({
        resolver: zodResolver(TradeDateSchema),
        defaultValues: {
            selectDate: "",
        }
    });

    const onSubmit = async (data) => { //async poner
        console.log(data.selectDate);
        console.log(userId)
        console.log(tradeId)
        const res = await setTradeDate({userId,tradeId,proposedDay:data.selectDate});
        if (res.success) {
            toast.success(res.success);
            router.refresh();
            router.back();
            router.refresh();

        }
        if (res.error) {
            toast.error(res.error);
            router.refresh();
        }
        console.log(res);
    }
    console.log(userId)
    console.log(tradeId)
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="flex justify-center items-center p-2 rounded-lg bg-sky-600">
                <Card className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
                <button
                className="hover:text-sky-500"
                onClick={handleBack}
                >
                <MoveLeft height={20} width={20} />
                </button>

                    { alreadySetted === false && (
                    <>
                    <CardHeader>
                        <CardTitle className="text-center text-xl font-semibold hover:text-sky-600">Pactar fecha</CardTitle>
                        <span className="block text-center text-slate-400 text-sm mt-2">Selecciona una fecha acordada para realizar el trueque</span>
                    </CardHeader>
                        
                        <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                {/* DATE */}
                                <FormField
                                    control={form.control}
                                    name="selectDate"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col items-center">
                                            <FormLabel className="hover:text-slate-500">Fecha:</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="date"
                                                    className="mt-1 block w-1/2"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex justify-center">
                                    <Button variant="ghost" className="bg-sky-500 text-white hover:bg-sky-600">
                                        Confirmar
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                    </>
                    )}
                    {alreadySetted === true && (
                        <>
                        <CardHeader className="flex justify-center items-center">
                          <CardTitle>
                            <BadgeCheck className="text-green-500 hover:text-green-700" height={40} width={40} />
                          </CardTitle>
                        </CardHeader>
                      
                        <CardContent>
                          <div className="flex flex-col items-center">
                            {(trade.idUsuario1 === userId && trade.proposedDay1 !== "EMPTY") && (
                              <span className="text-slate-500 text-center">
                                Has pactado la fecha <span className="font-semibold text-slate-700">{trade.proposedDay1}</span>, espera a que{" "}
                                <span className="font-semibold text-slate-700">{trade.NombreUsuario2} {trade.ApellidoUsuario2}</span>{" "}
                                confirme la fecha.
                              </span>
                            )}
                      
                            {(trade.idUsuario2 === userId && trade.proposedDay2 !== "EMPTY") && (
                              <span className="text-slate-500 text-center">
                                Has pactado la fecha <span className="font-semibold text-slate-700">{trade.proposedDay2}</span>, espera a que{" "}
                                <span className="font-semibold text-slate-700">{trade.NombreUsuario1} {trade.ApellidoUsuario1}</span>{" "}
                                confirme la fecha.
                              </span>
                            )}
                          </div>    
                        </CardContent>
                      </>
                      
                    )}

                </Card>
            </div>
        </div>
    );
}
