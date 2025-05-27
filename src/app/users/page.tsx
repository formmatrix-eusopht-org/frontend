'use client';
import React, { useState, useEffect, useDeferredValue } from 'react';
import './transactions.css';
import { TrashIcon, PencilSquareIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { UserAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import Loading from '../../components/pages/Loading';
import { useAppContext } from '@/context';

import SimpleTransfer from '../../components/molecules/SimpleTransfer';
import MultipleTransfer from '../../components/molecules/MultipleTransfer';
import DuplicateTitle from '../../components/molecules/DuplicateTitle';
import DuplicateRegistration from '../../components/molecules/DuplicateRegistration';
import DuplicatePlatesStickers from '../../components/molecules/DuplicatePlatesAndSticklers';
import AddLienholder from '../../components/molecules/LienHolderAddition';
import RemoveLienholder from '../../components/molecules/LienHolderRemovel';
import ChangeOfAddress from '../../components/molecules/ChangeOfAddress';
import CommercialVehicleTransfer from '../../components/molecules/CommercialVehicleTitle';
import SalvageTransfer from '../../components/molecules/Salvage';
import PlannedNonOperation from '../../components/molecules/FilingPNO';
import RestoringPNOTransfer from '../../components/molecules/RestoringPno';
import CertificateOfNonOperation from '../../components/molecules/CertificateOfNonOperation';
import DisabledPersonPlacards from '../../components/molecules/DisabledPersonAndPlacards';
import DuplicateStickers from '../../components/molecules/DuplicateStickersOnly';
import NameChange from '../../components/molecules/NameChange';
import PersonalizedPlates from '../../components/molecules/PersonlisedPlates';

interface ITransaction {
  _id?: string;
  name?: string;
  email?: string;
  createdAt?: string;
  transactionType?: string;
  formData?: any;
  userId?: string;
}

const transactionComponents: Record<string, React.FC<{ formData: any }>> = {
  'Simple Transfer': SimpleTransfer,
  'Multiple Transfer': MultipleTransfer,
  'Duplicate Title Transfer': DuplicateTitle,
  'Duplicate Registration Transfer': DuplicateRegistration,
  'Duplicate Plates & Stickers': DuplicatePlatesStickers,
  'Lien Holder Addition': AddLienholder,
  'Lien Holder Removal': RemoveLienholder,
  'Change Of Address Transfer': ChangeOfAddress,
  'Commercial Vehicle Transfer': CommercialVehicleTransfer,
  'Salvage Title Transfer': SalvageTransfer,
  'Filing PNO Transfer': PlannedNonOperation,
  'Restoring PNO Transfer': RestoringPNOTransfer,
  'Certificate Of Non-Operation Transfer': CertificateOfNonOperation,
  'Disabled Person and Placards': DisabledPersonPlacards,
  'Duplicate Stickers': DuplicateStickers,
  'Name Change/Correction Transfer': NameChange,
  'Personalized Plates (Order)': PersonalizedPlates,
  'Personalized Plates (Exchange)': PersonalizedPlates,
  'Personalized Plates (Replacement)': PersonalizedPlates,
  'Personalized Plates (Reassignment)': PersonalizedPlates,
};

export default function Users() {
  const { transactions, setTransactions, setFormData } = useAppContext()!;
  const { user, isSubscribed } = UserAuth();
  const router = useRouter();

  const [searchFor, setSearchFor] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState<ITransaction | null>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [loading, setLoading] = useState(true);
  const [noTransactions, setNoTransactions] = useState(false);
  const deferredSearchFor = useDeferredValue(searchFor);

  useEffect(() => {
    if (!user) {
      router.push('/');
    } else if (!isSubscribed) {
      router.push('/signUp');
    } else {
      setLoading(false);
    }
  }, [user, isSubscribed, router]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('Fetching recent transactions...');
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/auth/getusers`);

        // if (res.status === 404) {
        //   setTransactions([]);
        //   setNoTransactions(true);
        //   return;
        // }
        const data = await res.json();
        console.log('Fetched data:', data);

        const txns = Array.isArray(data.transactions) ? data.transactions : [];

        setTransactions(txns);
        setNoTransactions(txns.length === 0);
      } catch (error) {
        console.error('Error fetching recent transactions:', error);
      }
    };

    if (user?.uid) fetchUsers();
  }, [user?.uid]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      try {
        const endpoint = deferredSearchFor.trim()
          ? `/api/auth/getusers`
          : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/getusers`;
        // const endpoint = deferredSearchFor.trim()
        //   ? `/api/get?searchFor=${deferredSearchFor}&userId=${user?.uid}`
        //   : `/api/getRecent?userId=${user?.uid}`;
        console.log('endpoint', endpoint);
        const res = await fetch(endpoint);

        if (res.status === 404) {
          setTransactions([]);
          setNoTransactions(true);
          return;
        }

        const data = await res.json();
        console.log('Fetched data:', data);
        if (data.error) {
          setTransactions([]);
          setNoTransactions(true);
        } else {
          const txns = Array.isArray(data) ? data : [];

          const sorted = [...txns].sort(
            (a: ITransaction, b: ITransaction) =>
              new Date(b.createdAt ?? '').getTime() - new Date(a.createdAt ?? '').getTime(),
          );

          setTransactions(sorted);
          setNoTransactions(sorted.length === 0);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [deferredSearchFor, setTransactions, user?.uid]);

  const handleEdit = (clientId: string, user_id: string | undefined) => {
    if (!user_id) return;

    const clientToEdit = transactions.find(
      (transaction) => transaction._id === clientId && transaction.userId === user_id,
    );

    if (!clientToEdit) {
      alert('Transaction not found.');
      return;
    }

    console.log('Transaction type:', clientToEdit.transactionType);
    console.log('Available components:', Object.keys(transactionComponents));

    let normalizedTransactionType = clientToEdit.transactionType;
    if (normalizedTransactionType.startsWith('Multiple Transfer')) {
      normalizedTransactionType = 'Multiple Transfer';
    }

    const formDataWithId = {
      ...clientToEdit.formData,
      _id: clientToEdit._id,
    };

    setFormData(formDataWithId);
    setSelectedTransaction({
      ...clientToEdit,

      transactionType: normalizedTransactionType,
      formData: formDataWithId,
    });
  };

  const handleDelete = async (clientId: string, user_id: string | undefined) => {
    if (!user_id) {
      console.error('User ID is required');
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/delete?transactionId=${clientId}`,
        {
          method: 'DELETE',
        },
      );
      // const response = await fetch(`/api/delete?clientId=${clientId}&user_id=${user_id}`, {
      //   method: 'DELETE',
      // });

      await response.json();
      setTransactions(transactions.filter((client) => client._id !== clientId));
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  const handleBackToTransactions = () => {
    setSelectedTransaction(null);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="container">
        <div className="transactionSearchContainer">
          <button className="addUserButton"     onClick={() => router.push('/adduser')}> Add User</button>
        </div>
        {noTransactions ? (
          <p className="noTransactionsMessage">No User found.</p>
        ) : transactions.length === 0 ? (
          <Loading />
        ) : (
          <table className="transactionsTable">
            <thead>
              <tr>
                <th className="transactionDateTitle">Date</th>
                <th className="transactionTypeHeading">User Name</th>
                <th className="transactionTypeHeading">Email</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction: ITransaction) => (
                <tr key={transaction._id}>
                  <td>
                    {transaction?.createdAt ? new Date(transaction.createdAt).toLocaleString() : ''}
                  </td>
                  <td>{transaction.name}</td>
                  <td>{transaction.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </LocalizationProvider>
  );
}
