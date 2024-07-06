"use client"
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table"
import { MoveLeft,Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { eliminarPost, eliminarPostComoDuenio } from "../../../../data/posts";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const columns = (handleDeleteConfirmation,user) => [

  {
    accessorKey: "title",
    header: "Post",
    cell: ({ row }) => (
      <div className="flex flex-col items-center">
        <Link href={row.original.boat 
          ? `/viewPosts/view-ship/${row.original.idCompletePost}`
          : `/viewPosts/view-vehicle/${row.original.idCompletePost}`
        }>
          <h1 className="font-semibold text-sm mb-2 hover:text-sky-600">{row.original.title}</h1>
        </Link>
        <img
          src={row.original.img}
          width="150"
          height="150"
          alt="Image"
          className="rounded-md"
        />
      </div>
    )
  },
  {
    accessorKey: "actions",
    header: "Acciones",
    cell: ({ row }) => (
      <div className="flex justify-center mt-2 items-center">
        {user === 'USER' && (
            <Link href={`/profile/offer/${row.original.idCompletePost}`}>
            <Button className="bg-sky-500 text-sm w-full h-full">Ofertas</Button>
          </Link>
        )}

        { (row.original.status === "HIDDEN" || row.original.status === "ACTIVE") && (
          <Trash2 size={20} className="hover:text-red-500 cursor-pointer ml-2" onClick={() => handleDeleteConfirmation({completePostId: row.original.idCompletePost})}/>
        )}
       
        
      </div>
    )
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => (
      <div className="flex justify-center">
        {row.original.status === "HIDDEN" ? (
          <div className="text-slate-500">Oculta</div>
        ) : row.original.status === "ACTIVE" ? (
          <div className="text-sky-500">Visible</div>
        ) : row.original.status === "PAUSED" ? (
          <div className="text-yellow-500">Pausada</div>
        ) : row.original.status === "DELETED" ? (
          <div className="text-red-500">Eliminada</div>
        ) : null}
      </div>
    )
  },
];

export function OwnPublicationsTable({ data,user='USER' }) {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  const handleDelete = async ({completePostId}) => {
    if( user === "ADMIN"){
      console.log(completePostId)
      const res = await eliminarPostComoDuenio({completePostId: completePostId});
      console.log(res);
      if (res?.success){
        toast.success(res.success);
        router.refresh();
      }
    } else {
      console.log(completePostId)
      const res = await eliminarPost({completePostId: completePostId});
      console.log(res);
      if (res?.success){
        toast.success(res.success);
        router.refresh();
      }
    }

  }

  const handleDeleteConfirmation = ({completePostId}) => {
    console.log(completePostId)
    toast.info("Estás seguro de que quieres eliminar el post?", {
      action: <>
      <div>
        <button onClick={() => {handleDelete({completePostId});toast.dismiss()}} className='hover:text-green-500  text-blue-500'>Confirmar</button>
        <button onClick={() => {toast.dismiss()}} className='hover:text-red-800 text-blue-500'>Cancelar</button>
        </div>
      </> ,
  })
  }
  const table = useReactTable({
    data: data,
    columns: columns(handleDeleteConfirmation,user),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 3 } }
  });

  return (
    <>
          {(data && data.length !== 0) ? (
            <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-5xl p-4">
            <div className="bg-sky-600 shadow-2xl rounded-lg p-2">
            <Card className="bg-white shadow-lg rounded-lg">
              <div className="flex justify-between items-center p-4">
                <button
                  className="hover:text-sky-500"
                  onClick={handleBack}
                >
                  <MoveLeft height={20} width={20} />
                </button>
                <CardTitle className="text-xl font-semibold text-center text-sky-600">
                  Publicaciones
                </CardTitle>
                <div></div>
              </div>
              <CardContent>
                <div className="rounded-md border p-4 bg-white">
                  <Table>
                    <TableHeader>
                      {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                            <TableHead key={header.id} className="text-center">
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                            </TableHead>
                          ))}
                        </TableRow>
                      ))}
                    </TableHeader>
                    <TableBody>
                      {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                          <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                          >
                            {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id} className="text-center">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={columns.length} className="h-24 text-center">
                            No results.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center p-4">
                <Button
                  variant="ghost"
                  className="text-sm hover:text-blue-600"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Anterior
                </Button>
                <span className="text-sm">
                  Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
                </span>
                <Button
                  variant="ghost"
                  className="text-sm hover:text-blue-600"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Siguiente
                </Button>
              </CardFooter>
            </Card>
            </div>
            </div>
          </div>
          ) : (
            <div className="flex items-center justify-center h-screen">
            <div className="flex justify-center items-center p-2 rounded-lg bg-sky-600">
            <Card className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-2">
            <button variant="ghost" className="hover:text-sky-500" onClick={handleBack}><MoveLeft height={20} width={20}/></button>
            <CardHeader>
              <CardTitle className="text-center text-xl font-semibold hover:text-sky-600">Publicaciones</CardTitle>
            </CardHeader>
            <CardContent>
              No hay publicaciones realizadas 🌎
            </CardContent>
          </Card>
          </div>
          </div>
          )}
    </>
  );
}
