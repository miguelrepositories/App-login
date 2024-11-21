using ApiCapotariaBatista.Models.Enums;

namespace ApiCapotariaBatista.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string OrderNumber { get; set; }
        public string Description { get; set; }
        public ETypeProduction TypeProduction { get; set; }
        public DateTime EntryDate { get; set; }
        public DateTime DeliveryForecast { get; set; }
        public EOrderStatus OrderStatus { get; set; }
        public float Value { get; set; }
        public int ClientId { get; set; }
        public virtual Client? Client { get; set; }
    }
}
