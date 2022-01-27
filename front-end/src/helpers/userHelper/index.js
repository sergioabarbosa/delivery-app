const setRoleText = (role) => {
  if (role === 'customer') return 'Cliente';
  if (role === 'seller') return 'P. Vendedora';
  if (role === 'administrator') return 'P. Administradora';
};

export default {
  setRoleText,
};
