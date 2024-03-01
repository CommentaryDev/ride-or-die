import { StatTable } from '@/components/StatsTable';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
async function getData() {
  const res = await fetch(`http://localhost:3000/api/stats`, {
    method: 'POST',
    cache: 'no-cache',
  });
  const stat = await res.json();
  return stat;
}
const Pieces = async () => {
  const stat = await getData();
  return <StatTable stats={stat} />;
};
export default Pieces;
